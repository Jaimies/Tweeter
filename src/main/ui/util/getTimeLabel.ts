export function getTimeLabel(date: Date): string {
    if (getFullDaysSince(date) >= 1) return toReadableDate(date)
    return getTimeSince(date)
}

const MILLIS_IN_DAY = 1000 * 3600 * 24
const MILLIS_IN_SECOND = 1000
const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600
const MINUTES_IN_HOUR = 60

function getFullDaysSince(date: Date): number {
    const millisSince = new Date().getTime() - date.getTime()
    return Math.floor(millisSince / MILLIS_IN_DAY)
}

function getTimeSince(date: Date): string {
    const secondsSince = getSecondsSince(date)

    if (secondsSince < SECONDS_IN_MINUTE) return `${secondsSince}s`
    if (secondsSince < SECONDS_IN_HOUR) return `${(getMinutesSince(date))}m`

    return `${getHoursSince(date)}h`
}

function getSecondsSince(date: Date): number {
    const millisSince = new Date().getTime() - date.getTime()
    const secondsSince = Math.round(millisSince / MILLIS_IN_SECOND)
    return Math.max(secondsSince, 1)
}

function getMinutesSince(date: Date): number {
    return Math.round(getSecondsSince(date) / SECONDS_IN_MINUTE)
}

function getHoursSince(date: Date): number {
    return Math.round(getMinutesSince(date) / MINUTES_IN_HOUR)
}

function toReadableDate(date: Date): string {
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
    "Dec",
]
