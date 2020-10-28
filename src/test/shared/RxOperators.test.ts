import {of} from "rxjs"
import {filterList, mapList} from "@/shared/RxOperators"
import {expectObservableValue} from "../RxTestUtils"

it("mapList()", () => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(mapList(item => item.toString()))
    return expectObservableValue(mappedObservable, ["1", "2"])
})

it("filterList()", () => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(filterList(item => item == 2))
    return expectObservableValue(mappedObservable, [2])
})
