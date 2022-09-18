function scrollFunction() {
let myButton = document.getElementById("top-Btn");
let reflectButton = document.getElementById("reflect-Btn");
    if (window.document.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      myButton.style.display = "block";
      reflectButton.style.display = "block";
    } else {
      myButton.style.display = "none";
      reflectButton.style.display = "none";
    }
  }

  function topFunction() {
  document.documentElement.scrollTop = 0;
}
  window.onscroll = function(){scrollFunction();}