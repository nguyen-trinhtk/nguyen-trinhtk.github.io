

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

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
   // Get form values
  var firstName = document.getElementById('fname').value;
  var lastName = document.getElementById('lname').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('msg').value;
   // Create an object to store the form data
  var formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message
  };
   // Convert form data to JSON
  var jsonData = JSON.stringify(formData);
   // Send the JSON data to your server using AJAX or fetch API
  // Example using fetch API:
  fetch('http://127.0.0.1:5000', {
      method: 'POST',
      body: jsonData,
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(function(response) {
      // Handle the response from the server
      console.log(response);
  })
  .catch(function(error) {
      // Handle any errors
      console.error(error);
  });
});

// After form submission
window.location.href = 'https://nguyen-trinhtk.github.io';