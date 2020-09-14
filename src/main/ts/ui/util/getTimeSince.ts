export function getTimeSince(date: Date): string {
    const secondsSince = getSecondsSince(date)

    if (secondsSince < SECONDS_IN_MINUTE) return `${secondsSince}s`
    if (secondsSince < SECONDS_IN_HOUR) return `${(getMinutesSince(date))}m`

    return `${getHoursSince(date)}h`
}

const MILLIS_IN_SECOND = 1000
const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600
const MINUTES_IN_HOUR = 60

function getSecondsSince(date: Date) {
    const millisSince = new Date().getTime() - date.getTime()
    const secondsSince = Math.round(millisSince / MILLIS_IN_SECOND)
    return Math.max(secondsSince, 1)
}

function getMinutesSince(date: Date) {
    return Math.round(getSecondsSince(date) / SECONDS_IN_MINUTE)
}

function getHoursSince(date: Date) {
    return Math.round(getMinutesSince(date) / MINUTES_IN_HOUR)
}
