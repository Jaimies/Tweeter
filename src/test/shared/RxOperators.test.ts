import {of} from "rxjs"
import {filterList, mapList} from "../../main/shared/RxOperators"
import {expectObservableValue} from "../RxTestUtils"

it("mapList()", done => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(mapList(item => item.toString()))
    expectObservableValue(mappedObservable, ["1", "2"], done)
})

it("filterList()", done => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(filterList(item => item == 2))
    expectObservableValue(mappedObservable, [2], done)
})
