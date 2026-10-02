/* VIVAA Responsive Effects Runtime (v2 — no cursor, opt-in reveal) */
(function(){
  const d = document;
  const on = (el,ev,fn,o)=>el&&el.addEventListener(ev,fn,o);
  const ready = (fn)=>d.readyState!=='loading'?fn():on(d,'DOMContentLoaded',fn);

  ready(()=>{
    // Scroll progress
    const bar = d.createElement('div'); bar.id='fxProgress'; d.body.appendChild(bar);

    // Back to top
    const top = d.createElement('button'); top.id='fxTop'; top.setAttribute('aria-label','Back to top'); top.innerHTML='↑';
    top.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
    d.body.appendChild(top);

    const nav = d.querySelector('header, nav, .navbar');
    on(window,'scroll',()=>{
      const h=d.documentElement; const p=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
      bar.style.width=p+'%';
      top.classList.toggle('show', h.scrollTop>400);
      if(nav) nav.classList.toggle('fx-nav-scrolled', h.scrollTop>20);
    },{passive:true});

    // Reveal (opt-in via .fx-reveal / .fx-stagger only)
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target);} });
    },{threshold:.12});
    d.querySelectorAll('.fx-reveal,.fx-stagger,.fx-img-reveal').forEach(el=>io.observe(el));

    // Ripple
    d.querySelectorAll('button, .btn, a[class*="btn"]').forEach(el=>{
      on(el,'click',ev=>{
        const r=el.getBoundingClientRect();
        const s=Math.max(r.width,r.height);
        const x=(ev.clientX||r.left+r.width/2)-r.left-s/2;
        const y=(ev.clientY||r.top+r.height/2)-r.top-s/2;
        const rip=d.createElement('span'); rip.className='fx-ripple';
        rip.style.cssText+=`;width:${s}px;height:${s}px;left:${x}px;top:${y}px`;
        if(getComputedStyle(el).position==='static') el.style.position='relative';
        el.appendChild(rip); setTimeout(()=>rip.remove(),650);
      });
    });

    // Count-up
    const cio = new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(!e.isIntersecting) return;
        const el=e.target;
        const raw = el.getAttribute('data-count') || el.textContent.replace(/[^\d.]/g,'');
        const target = parseFloat(raw); if(!target){cio.unobserve(el);return;}
        const suffix = el.getAttribute('data-suffix') || (el.textContent.match(/[^\d.,\s]+$/)?.[0]||'');
        let v=0; const step=Math.max(1,target/60);
        const t=setInterval(()=>{v=Math.min(v+step,target); el.textContent=Math.round(v).toLocaleString()+suffix; if(v>=target) clearInterval(t);},20);
        cio.unobserve(el);
      });
    },{threshold:.4});
    d.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

    // Form shake
    d.querySelectorAll('form').forEach(f=>{
      on(f,'submit',()=>{
        [...f.querySelectorAll('[required]')].filter(i=>!i.value.trim()).forEach(i=>{
          i.classList.add('fx-shake'); setTimeout(()=>i.classList.remove('fx-shake'),500);
        });
      });
    });

    // Parallax
    const parEls=d.querySelectorAll('[data-parallax]');
    if(parEls.length){
      on(window,'scroll',()=>{
        parEls.forEach(el=>{
          const speed=parseFloat(el.dataset.parallax)||.3;
          el.style.transform=`translate3d(0,${window.scrollY*speed}px,0)`;
        });
      },{passive:true});
    }
  });
})();
