// Button variables
let buttons = document.querySelectorAll('.clickme')

let yinBtn = document.getElementById("yin");
let yangBtn = document.getElementById("yang");
let body = document.getElementById("background");
let headerImage = document.getElementById("header");
let boxy = document.querySelectorAll(".boxy")

// When user clicks button on meditate page, disappear for better UX.
buttons.forEach(e => {
    e.addEventListener('click', ()=> {
        e.parentElement.setAttribute('style', 'display:none;')
    })
})

yangBtn.addEventListener('click', ()=> {
    headerImage.setAttribute('src','/public/media/WNFB.png')
    body.setAttribute('style','background-image: url("https://cdn.pixabay.com/photo/2018/09/03/23/56/sea-3652697_960_720.jpg"); color:black;')
    boxy.forEach(e=> {
        e.setAttribute('style','background-color: rgba(255, 255, 255, 0.485);')
    })
})

yinBtn.addEventListener('click', ()=> {
    headerImage.setAttribute('src','/public/media/WNFB2(white).png')
    body.setAttribute('style','background-image: url("https://cdn.pixabay.com/photo/2014/06/24/17/38/smoke-376543_960_720.jpg"); color: white;')
    boxy.forEach(e=> {
        e.setAttribute('style','background-color: rgba(0, 0, 0, 0.485);')
    })
})