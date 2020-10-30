import {Observable} from "rxjs"
import {first} from "rxjs/operators"

export async function expectObservableValue<T>(observable: Observable<T>, expectedValue: T) {
    expect(await getValue(observable)).toEqual(expectedValue)
}

export function getValue<T>(observable: Observable<T>): Promise<T> {
    return new Promise(resolve => {
        observable.pipe(first()).subscribe(resolve)
    })
}
