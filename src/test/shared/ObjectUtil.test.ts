import {clone} from "@/shared/ObjectUtil"

class Custom {
    constructor(public arg: string = "arg", public otherArg: string = "otherArg") {}
}

it("clones an object", () => {
    const object = new Custom()
    const cloneObject = clone(object)
    expect(cloneObject).not.toBe(object)
    expect(cloneObject).toEqual(object)
    expect(cloneObject).toBeInstanceOf(Custom)
})

it("clones an object and changes a property", () => {
    const object = new Custom()
    const cloneObject = clone(object, {arg: "newArg"})
    expect(cloneObject.arg).toBe("newArg")
})
