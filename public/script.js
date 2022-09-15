let button = document.querySelectorAll('.clickme')

button.forEach(e => {
    e.addEventListener('click', ()=> {
        e.parentElement.setAttribute('style', 'display:none;')
    })
})