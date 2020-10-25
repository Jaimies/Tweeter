import {generateHash} from "@/shared/generateHash"

it("is unique", () => {
    expect(generateHash()).not.toEqual(generateHash())
})

it("has length of 30 characters", () => {
    expect(generateHash()).toHaveLength(30)
})
