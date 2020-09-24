import {of} from "rxjs"
import {mapList} from "../../main/shared/RxOperators"
import {expectObservableValue} from "../RxTestUtils"

it("maps list", done => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(mapList(item => item.toString()))
    expectObservableValue(mappedObservable, ["1", "2"], done)
})
