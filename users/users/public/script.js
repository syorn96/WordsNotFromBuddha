module.exports = function determineSign(month, day) {
    if (month == 3 && day >= 21 || month == 4 && day <= 19) {
        sign = 'Aries'
        return sign
    } else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
        sign = 'Taurus'
        return sign
    } else if (month == 5 && day >= 21 || month == 6 && day <= 20) {
        sign = 'Gemini'
        return sign
    } else if (month == 6 && day >= 21 || month == 7 && day <= 22) {
        sign = 'Cancer'
        return sign
    } else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
        sign = 'Leo'
        return sign
    } else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
        sign = 'Virgo'
        return sign
    } else if (month == 9 && day >= 23 || month == 10 && day <= 22) {
        sign = 'Libra'
        return sign
    } else if (month == 10 && day >= 23 || month == 11 && day <= 22) {
        sign = 'Scorpio'
        return sign
    } else if (month == 11 && day >= 22 || month == 12 && day <= 21) {
        sign = 'Sagittarius'
        return sign
    } else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
        sign = 'Capricorn'
        return sign
    } else if (month == 1 && day >= 20 || month == 2 && day <= 18) {
        sign = 'Aquarius'
        return sign
    } else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
        sign = 'Pisces'
        return sign
    }
}