addSSuffix = n => n == 1 ? '' : 's'

getTextFromFloatAndSuffix = (n, suf) => {
    const toInt = Math.floor(n)
    return toInt + suf + addSSuffix(toInt)
}

module.exports = {
    toMinHDAgo: (dnow, d) => {
        const minDiff = (dnow - d) / 60000
        if (minDiff < 60) {
            return getTextFromFloatAndSuffix(minDiff, ' minute')
        } else if (minDiff < 60 * 24) {
            return getTextFromFloatAndSuffix(minDiff / 60, ' hour')
        } else {
            return getTextFromFloatAndSuffix(minDiff / 60 / 24, ' day')
        }
    }
}