// let buttons = document.querySelectorAll('.clickme')

// buttons.forEach(e => {
//     e.addEventListener('click', ()=> {
//         e.parentElement.setAttribute('style', 'display:none;')
//     })
// })

let sign = null
let month = 10
let day = 23
module.exports = function determineSign() {
    if (month == 3 && day >= 21 || month == 4 && day <= 19) {
        sign = 'aries'
        return sign
    } else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
        sign = 'taurus'
        return sign
    } else if (month == 5 && day >= 21 || month == 6 && day <= 20) {
        sign = 'gemini'
        return sign
    } else if (month == 6 && day >= 21 || month == 7 && day <= 22) {
        sign = 'cancer'
        return sign
    } else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
        sign = 'leo'
        return sign
    } else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
        sign = 'virgo'
        return sign
    } else if (month == 9 && day >= 23 || month == 10 && day <= 22) {
        sign = 'libra'
        return sign
    } else if (month == 10 && day >= 23 || month == 11 && day <= 22) {
        sign = 'scorpio'
        return sign
    } else if (month == 11 && day >= 22 || month == 12 && day <= 21) {
        sign = 'sagittarius'
        return sign
    } else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
        sign = 'capricorn'
        return sign
    } else if (month == 1 && day >= 20 || month == 2 && day <= 18) {
        sign = 'aquarius'
        return sign
    } else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
        sign = 'pisces'
        return sign
    }
}
// determineSign()
console.log(sign)
