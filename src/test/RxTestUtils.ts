import {Observable} from "rxjs"

export function expectObservableValue<T>(observable: Observable<T>, expectedValue: T) {
    return new Promise(resolve => {
        observable.subscribe(value => {
            expect(value).toEqual(expectedValue)
            resolve()
        })
    })
}
