// Button variables
let buttons = document.querySelectorAll('.clickme')
let mybutton = document.getElementById("top-Btn");
let reflectbutton = document.getElementById("reflect-Btn");

// When user clicks button on meditate page, disappear for better UX.
buttons.forEach(e => {
    e.addEventListener('click', ()=> {
        e.parentElement.setAttribute('style', 'display:none;')
    })
})

// When the user scrolls down 20px from the top of the document, show the hidden buttons
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    reflectbutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
    reflectbutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 0;
}