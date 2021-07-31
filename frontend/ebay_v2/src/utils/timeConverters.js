
export function convertRawDateToCondensed(date) {
    return date.split("T")[0]
       
}

export function convertDateToTimeLeft(date) {

    let now = Date.now()
    date = Date.parse(date)

    let left = (date-now)/1000

    return convertSecondsToDuration(left)

}

export function convertSecondsToHours(seconds) {

    let sec = Math.floor(seconds % 60)
    let min = Math.floor(seconds / 60)
    let hour = Math.floor((min / 60)/24)

    min = min % 60

    return {sec:sec, min:min, hour:hour}

}

export function convertSecondsToDays(seconds) {

    let aDayInSeconds = 86400

    return Math.floor(seconds / aDayInSeconds)
}

export function convertSecondsToDuration(time) {

    let diviseur = [60, 60, 24, 31, 12, 365]
    let time_unity = ["minute(s)", "heure(s)", "jour(s)", "mois", "année(s)"]

    for (let i = 0 ; i < diviseur.length ; i++) {
        time = time / diviseur[i]
        if (time < 1) {
            if (i == 0) {
                return " moins d'1min"
            }
            return Math.round(time*diviseur[i]) + ' ' + time_unity[i-1%time_unity.length]
        }
    }}

    
export function convertDateToSeconds(date) {
        
    let date_seconds = Date.parse(date)
    let now_seconds = Date.now()
    
    return (now_seconds-date_seconds)/1000

}

export function convertDateToDuration(date) {
    let seconds = convertDateToSeconds(date)

    if (seconds < 0) {
        return "0 secondes"
    }

    return convertSecondsToDuration(seconds)

}
