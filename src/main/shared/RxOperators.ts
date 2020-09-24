import {OperatorFunction} from "rxjs"
import {map} from "rxjs/operators"

export function mapList<T, R>(mapFunction: (input: T) => R): OperatorFunction<T[], R[]> {
    return map(list => list.map(mapFunction))
}
