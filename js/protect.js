/* Vivaa Solutions - basic content protection */
(function () {
  "use strict";

  var allow = function (el) {
    if (!el) return false;
    var t = (el.tagName || "").toLowerCase();
    return t === "input" || t === "textarea" || el.isContentEditable;
  };

  // Disable right-click / context menu
  document.addEventListener("contextmenu", function (e) {
    if (allow(e.target)) return;
    e.preventDefault();
    return false;
  }, false);

  // Disable text selection & drag of images
  document.addEventListener("selectstart", function (e) {
    if (allow(e.target)) return;
    e.preventDefault();
  }, false);
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
  }, false);

  // Disable copy / cut
  ["copy", "cut"].forEach(function (evt) {
    document.addEventListener(evt, function (e) {
      if (allow(e.target)) return;
      e.preventDefault();
    }, false);
  });

  // Block devtools / view-source keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toUpperCase();
    var block =
      k === "F12" ||
      (e.ctrlKey && e.shiftKey && (k === "I" || k === "J" || k === "C" || k === "K")) ||
      (e.metaKey && e.altKey && (k === "I" || k === "J" || k === "C" || k === "U")) ||
      (e.ctrlKey && !e.shiftKey && (k === "U" || k === "S" || k === "P")) ||
      (e.metaKey && (k === "U" || k === "S" || k === "P"));
    if (block) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
})();
