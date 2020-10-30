import {from} from "rxjs"
import {getValue} from "@/shared/RxUtil"

it("returns the value of observable", async () => {
    const observable = from(["value1", "value2"])
    expect(await getValue(observable)).toBe("value1")
})
