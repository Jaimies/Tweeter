const MILLIS_IN_DAY = 1000 * 3600 * 24

export function getFullDaysSince(date: Date): number {
    const millisSince = new Date().getTime() - date.getTime()
    return Math.floor(millisSince / MILLIS_IN_DAY)
}