import {toReadableDate} from "./toReadableDate"
import {getTimeSince} from "./getTimeSince"
import {getFullDaysSince} from "./getFullDaysSince"

export function getTimeLabel(date: Date): string {
    if (getFullDaysSince(date) >= 1) return toReadableDate(date)
    return getTimeSince(date)
}