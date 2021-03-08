import {diff, equals} from "../src/ArrayUtil"

it("equals()", () => {
    expect(equals([], [])).toBe(true)
    expect(equals(["a"], [])).toBe(false)
    expect(equals(["a"], ["b"])).toBe(false)
    expect(equals(["a", "b", "c"], ["c", "b", "a"])).toBe(true)
})

it("diff()", () => {
    expect(diff(["a"], [])).toEqual(["a"])
    expect(diff(["b"], [])).toEqual(["b"])
    expect(diff(["b", "a"], ["b"])).toEqual(["a"])
})
