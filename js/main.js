'use strict';
/* Navbar scroll */
(()=>{const n=document.getElementById('navbar');if(!n)return;const f=()=>n.classList.toggle('scrolled',scrollY>50);addEventListener('scroll',f,{passive:true});f()})();
/* Mobile menu */
(()=>{const b=document.getElementById('mob-btn'),m=document.getElementById('mob-menu');if(!b||!m)return;b.addEventListener('click',()=>{const hidden=m.classList.toggle('hidden');b.setAttribute('aria-expanded',String(!hidden));document.body.style.overflow=hidden?'':'hidden'});m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.add('hidden');b.setAttribute('aria-expanded','false');document.body.style.overflow=''}))})();
/* Dropdown hover */
document.querySelectorAll('.nav-drop').forEach(d=>{const trigger=d.querySelector('.nav-trigger');if(!trigger)return;trigger.addEventListener('click',e=>{if(matchMedia('(hover: none)').matches){e.preventDefault();document.querySelectorAll('.nav-drop.open').forEach(x=>{if(x!==d)x.classList.remove('open')});d.classList.toggle('open')}})});document.addEventListener('click',e=>{if(!e.target.closest('.nav-drop'))document.querySelectorAll('.nav-drop.open').forEach(d=>d.classList.remove('open'))});
/* Reveal on scroll */
(()=>{const els=document.querySelectorAll('.reveal');if(!els.length)return;const io=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});els.forEach(e=>io.observe(e))})();
/* Counters */
(()=>{const cs=document.querySelectorAll('[data-count]');if(!cs.length)return;const ease=t=>1-Math.pow(1-t,3);const go=el=>{const tgt=parseFloat(el.dataset.count),suf=el.dataset.suffix||'',dur=2000,st=performance.now(),step=now=>{const t=Math.min((now-st)/dur,1),v=tgt*ease(t);el.textContent=(Number.isInteger(tgt)?Math.floor(v):v.toFixed(1))+suf;if(t<1)requestAnimationFrame(step)};requestAnimationFrame(step)};const io=new IntersectionObserver(en=>en.forEach(e=>{if(e.isIntersecting){go(e.target);io.unobserve(e.target)}}),{threshold:.5});cs.forEach(c=>io.observe(c))})();
/* FAQ accordion */
document.querySelectorAll('.faq-btn').forEach(b=>{b.addEventListener('click',()=>{const i=b.closest('.faq-item'),o=i.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(x=>{x.classList.remove('open');x.querySelector('.faq-body').style.maxHeight='0'});if(!o){i.classList.add('open');const body=i.querySelector('.faq-body');body.style.maxHeight=body.scrollHeight+'px'}})});
/* Video slider */
(()=>{const track=document.getElementById('slider-track');if(!track)return;const slides=track.querySelectorAll('.slide');let cur=0,timer;const go=n=>{slides[cur].classList.remove('is-active');cur=(n+slides.length)%slides.length;slides[cur].classList.add('is-active');track.style.transform=`translateX(-${cur*100}%)`;document.querySelectorAll('.slide-dot').forEach((d,i)=>d.classList.toggle('active-dot',i===cur))};document.getElementById('sl-prev')?.addEventListener('click',()=>{clearInterval(timer);go(cur-1);timer=setInterval(()=>go(cur+1),6000)});document.getElementById('sl-next')?.addEventListener('click',()=>{clearInterval(timer);go(cur+1);timer=setInterval(()=>go(cur+1),6000)});document.querySelectorAll('.slide-dot').forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(timer);go(i);timer=setInterval(()=>go(cur+1),6000)}));slides[0]?.classList.add('is-active');timer=setInterval(()=>go(cur+1),6000)})();
/* Active nav link */
(()=>{const p=location.pathname.split('/').pop()||'/home';document.querySelectorAll('nav a[href]').forEach(a=>{const h=a.getAttribute('href');if(h&&(h===p||h.endsWith('/'+p)))a.classList.add('text-brand','font-semibold')})})();
/* Form submit */
(()=>{const f=document.getElementById('contact-form');if(!f)return;f.addEventListener('submit',e=>{e.preventDefault();const b=f.querySelector('[type=submit]'),o=b.textContent;b.textContent='Sending…';b.disabled=true;setTimeout(()=>{b.textContent='✓ Sent! We\'ll reply within 1 hour';b.classList.remove('bg-brand');b.classList.add('bg-green-500');f.reset();setTimeout(()=>{b.textContent=o;b.disabled=false;b.classList.remove('bg-green-500');b.classList.add('bg-brand')},4000)},1200)})})();

/* Tab switcher v2 (for home page service tabs) */
(()=>{
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const tabId = btn.dataset.tab;
      if(!tabId) return;
      // Update buttons
      btn.closest('[data-tabs]')?.querySelectorAll('.tab-btn').forEach(b=>{
        b.classList.remove('bg-brand','text-bg');
        b.classList.add('text-muted','hover:text-ink');
      });
      btn.classList.add('bg-brand','text-bg');
      btn.classList.remove('text-muted','hover:text-ink');
      // Show/hide panels
      const panels = document.querySelectorAll('.tab-content');
      panels.forEach(p=>{
        if(p.id===tabId){p.classList.remove('hidden');p.classList.add('is-active')}
        else{p.classList.add('hidden');p.classList.remove('is-active')}
      });
    });
  });
})();

/* Back-to-top button (injected on all pages) */
(()=>{
  if(document.getElementById('back-to-top'))return;
  const b=document.createElement('button');
  b.id='back-to-top';
  b.setAttribute('aria-label','Back to top');
  b.innerHTML='↑';
  Object.assign(b.style,{
    position:'fixed',right:'24px',bottom:'92px',width:'46px',height:'46px',
    borderRadius:'50%',border:'1px solid rgba(255,153,0,.35)',
    background:'linear-gradient(135deg,#ff9900,#ec4899)',color:'#fff',
    fontSize:'20px',fontWeight:'700',cursor:'pointer',zIndex:'9999',
    boxShadow:'0 10px 30px rgba(255,153,0,.35)',opacity:'0',
    transform:'translateY(20px) scale(.85)',pointerEvents:'none',
    transition:'opacity .35s ease, transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .3s ease'
  });
  b.onmouseenter=()=>{b.style.transform='translateY(0) scale(1.08)';b.style.boxShadow='0 14px 38px rgba(255,153,0,.55)'};
  b.onmouseleave=()=>{b.style.transform='translateY(0) scale(1)';b.style.boxShadow='0 10px 30px rgba(255,153,0,.35)'};
  b.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
  document.body.appendChild(b);
  const toggle=()=>{
    const on=window.scrollY>320;
    b.style.opacity=on?'1':'0';
    b.style.pointerEvents=on?'auto':'none';
    b.style.transform=on?'translateY(0) scale(1)':'translateY(20px) scale(.85)';
  };
  window.addEventListener('scroll',toggle,{passive:true});
  toggle();
})();
