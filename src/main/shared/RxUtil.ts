import {Observable} from "rxjs"
import {first} from "rxjs/operators"

export function getValue<T>(observable: Observable<T>): Promise<T> {
    return new Promise(resolve => {
        observable.pipe(first()).subscribe(resolve)
    })
}
