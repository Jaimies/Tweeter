export function toReadableDate(date: Date): string {
    const month = getMonth(date)
    const day = getDay(date)
    const yearSuffix = getYearSuffix(date)

    return `${month} ${day}${yearSuffix}`
}

function getMonth(date: Date): string {
    return monthNames[date.getUTCMonth()]
}

function getDay(date: Date): string {
    return date.getUTCDate().toString()
}

function getYearSuffix(date: Date): string {
    if (!isInCurrentYear(date)) return `, ${date.getUTCFullYear()}`
    return ""
}

function isInCurrentYear(date: Date) {
    return date.getUTCFullYear() == new Date().getUTCFullYear()
}

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]
