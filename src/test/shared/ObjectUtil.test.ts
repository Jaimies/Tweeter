import {clone, toPlainObject} from "@/shared/ObjectUtil"

class Custom {
    constructor(public arg: string = "arg", public otherArg: OtherCustom = new OtherCustom()) {}
}

class OtherCustom {
    constructor(public arr: string[] = [], public date: Date = new Date()) {}
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

it("toPlainObject()", () => {
    const object = new Custom()
    const plainObject = toPlainObject(object)
    expect(plainObject).toBeInstanceOf(Object)
    expect(plainObject).toEqual(object)
    expect(plainObject.otherArg).toEqual(object.otherArg)
    expect(plainObject.otherArg).toBeInstanceOf(Object)
})
