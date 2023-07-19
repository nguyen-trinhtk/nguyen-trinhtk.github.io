

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

const swiperContainer = document.querySelector('.swiper-container');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const prevButton = document.querySelector('.swiper-button-prev');
const nextButton = document.querySelector('.swiper-button-next');

let currentIndex = 0;
updateButtons();

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
    updateButtons();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlidePosition();
    updateButtons();
  }
});

function updateSlidePosition() {
  const slideWidth = slides[0].offsetWidth;
  swiperWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

function updateButtons() {
  if (currentIndex === 0) {
    prevButton.classList.add('fade');
  } else {
    prevButton.classList.remove('fade');
  }

  if (currentIndex === slides.length - 1) {
    nextButton.classList.add('fade');
  } else {
    nextButton.classList.remove('fade');
  }
}