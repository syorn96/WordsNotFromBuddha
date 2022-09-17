// Button variables
let buttons = document.querySelectorAll('.clickme')
let myButton = document.getElementById("top-Btn");
let reflectButton = document.getElementById("reflect-Btn");
let yinBtn = document.getElementById("yin");
let yangBtn = document.getElementById("yang");
let body = document.getElementById("background");
let headerImage = document.getElementById("header");
let boxy = document.getElementsByClassName('boxy')
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
    myButton.style.display = "block";
    relectButton.style.display = "block";
  } else {
    myButton.style.display = "none";
    reflectButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 0;
}

yangBtn.addEventListener('click', ()=> {
    headerImage.setAttribute('src','/public/media/WNFB.png')
    body.setAttribute('style','background-image: url("https://cdn.pixabay.com/photo/2016/10/19/03/32/duck-1752065_960_720.jpg"); color:black;')
    boxy.setAttribute('style','background-color: rgba(255, 255, 255, 0.485);')
})

yinBtn.addEventListener('click', ()=> {
    headerImage.setAttribute('src','/public/media/WNFB2(white).png')
    body.setAttribute('style','background-image: url("https://cdn.pixabay.com/photo/2016/09/08/12/00/stars-1654074_960_720.jpg"); color: white;')
    boxy.setAttribute('style','background-color: rgba(0, 0, 0, 0.485);')
})