import {Observable} from "rxjs"
import DoneCallback = jest.DoneCallback

export function expectObservableValue<T>(observable: Observable<T>, expectedValue: T, done: DoneCallback) {
    observable.subscribe(value => {
        expect(value).toEqual(expectedValue)
        done()
    })
}
