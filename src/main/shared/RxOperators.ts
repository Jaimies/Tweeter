import {OperatorFunction} from "rxjs"
import {map} from "rxjs/operators"

export function mapList<T, R>(mapFunction: (input: T) => R): OperatorFunction<T[], R[]> {
    return map(list => list.map(mapFunction))
}

export function filterList<T>(mapFunction: (input: T) => boolean): OperatorFunction<T[], T[]> {
    return map(list => list.filter(mapFunction))
}
