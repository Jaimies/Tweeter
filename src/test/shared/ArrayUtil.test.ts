import {removeItem, split, unconcat} from "@/shared/ArrayUtil"

it("removeItem()", () => {
    const array = [0, 1, 2]
    removeItem(array, 1)
    expect(array).toEqual([0, 2])
})

it("unconcat()", () => {
    const array = [0, 1, 2]
    expect(unconcat(array, 1)).toEqual([0, 2])
    expect(array).toEqual([0, 1, 2])
})

it("split()", () => {
    const array = [0, 1, 2, 3, 4]
    expect(split(array, 2)).toEqual([[0, 1], [2, 3], [4]])
})
