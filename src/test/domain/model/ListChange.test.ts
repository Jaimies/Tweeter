import {ListChange} from "@/domain/model/ListChange"

it("ListChange.Add", () => {
    const change = new ListChange.Add("value")
    expect(change.apply([])).toEqual(["value"])
})

it("ListChange.Remove", () => {
    const change = new ListChange.Remove("value")
    expect(change.apply(["value"])).toEqual([])
})
