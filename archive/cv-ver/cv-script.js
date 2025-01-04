const words = ["Software Dev", "Web Dev", "Robotics"];
let i = 0; // Initialize the index variable

function typeNow() {
    let word = words[i].split("");
    var loopTyping = function() {
       if (word.length > 0) {
          document.getElementById('text').innerHTML += word.shift();
       } else {
          setTimeout(deleteNow, 1000); // Wait before starting to delete
          return false;
       };
       setTimeout(loopTyping, 75);
    };
    loopTyping();
};

function deleteNow() {
    let word = words[i].split("");
    var loopDeleting = function() {
       if (word.length > 0) {
          word.pop();
          document.getElementById('text').innerHTML = word.join("");
       } else {
          if (words.length > (i + 1)) {
             i++;
          } else {
             i = 0;
          };
          setTimeout(typeNow, 500); // Wait before starting to type the next word
          return false;
       };
       setTimeout(loopDeleting, 25);
    };
    loopDeleting();
};

typeNow();
