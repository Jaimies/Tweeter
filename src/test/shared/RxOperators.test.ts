import {of} from "rxjs"
import {filterList, mapList} from "@/shared/RxOperators"
import {getValue} from "@/shared/RxUtil"

it("mapList()", async () => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(mapList(item => item.toString()))
    expect(await getValue(mappedObservable)).toEqual(["1", "2"])
})

it("filterList()", async () => {
    const observable = of([1, 2])
    const mappedObservable = observable.pipe(filterList(item => item == 2))
    expect(await getValue(mappedObservable)).toEqual([2])
})
