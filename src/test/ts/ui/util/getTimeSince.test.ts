import {getTimeSince} from "../../../../main/ts/ui/util/getTimeSince"
import MockDate from "mockdate"

beforeAll(() => MockDate.set("2020-01-01T12:00:00Z"))
afterAll(() => MockDate.reset())

it("getTimeSince", () => {
    expect(getTimeSince(new Date("2020-01-01T11:59:59Z"))).toBe("1s")
    expect(getTimeSince(new Date("2020-01-01T12:00:01Z"))).toBe("1s")
    expect(getTimeSince(new Date("2020-01-01T11:59:58.100Z"))).toBe("2s")
    expect(getTimeSince(new Date("2020-01-01T11:59:00Z"))).toBe("1m")
    expect(getTimeSince(new Date("2020-01-01T11:58:20Z"))).toBe("2m")
    expect(getTimeSince(new Date("2020-01-01T10:20:00Z"))).toBe("2h")
})
