

var prevScrollpos = window.scrollY || window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.scrollY || window.pageYOffset;
  var hideElements = document.querySelectorAll(".hideonscroll");
  for (var i = 0; i < hideElements.length; i++) {
    if (prevScrollpos > currentScrollPos) {
      hideElements[i].style.top = "0";
    } else {
      hideElements[i].style.top = "-80px";
    }
  }
  prevScrollpos = currentScrollPos;
};
window.addEventListener('DOMContentLoaded', function() {
  var hideonscroll = document.querySelector('.hideonscroll');
  hideonscroll.classList.add('visible');
});

