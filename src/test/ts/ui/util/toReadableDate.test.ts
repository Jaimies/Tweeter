import {toReadableDate} from "../../../../main/ts/ui/util/toReadableDate"
import MockDate from "mockdate"

beforeAll(() => MockDate.set("2020-06-01T00:00:00Z"))
afterAll(() => MockDate.reset())

it("toReadableDate", () => {
    expect(toReadableDate(new Date("2020-01-01Z"))).toBe("Jan 1")
    expect(toReadableDate(new Date("2020-01-02Z"))).toBe("Jan 2")
    expect(toReadableDate(new Date("2020-02-01Z"))).toBe("Feb 1")
    expect(toReadableDate(new Date("2019-01-01Z"))).toBe("Jan 1, 2019")
})