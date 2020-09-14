import MockDate from "mockdate"
import {getFullDaysSince} from "../../../../main/ts/ui/util/getFullDaysSince"

beforeAll(() => MockDate.set("2020-01-02Z"))
afterAll(() => MockDate.reset())

it("getFullDaysSince", () => {
    expect(getFullDaysSince(new Date("2020-01-02Z"))).toBe(0)
    expect(getFullDaysSince(new Date("2020-01-01Z"))).toBe(1)
    expect(getFullDaysSince(new Date("2020-01-01T12:00:00Z"))).toBe(0)
})