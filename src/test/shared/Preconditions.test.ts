import {checkIsDefined} from "@/shared/Preconditions"
import {IllegalStateException} from "@/shared/IllegalStateException"

const exception = new IllegalStateException("Argument is not defined")

describe("checkIfDefined()", () => {
    it.each([null, undefined])("throws on %o", value => {
        expect(() => {
            checkIsDefined(value, exception.message)
        }).toThrow(exception)
    })

    it("doesn't throw on a defined value", () => {
        expect(() => {
            checkIsDefined("defined", exception.message)
        }).not.toThrow()
    })
})
