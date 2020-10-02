import MockDate from "mockdate"
import {getTimeLabel} from "../../../main/ui/util/getTimeLabel"

beforeAll(() => MockDate.set("2020-01-01T00:00:00Z"))
afterAll(() => MockDate.reset())

it("getTimeLabel()", () => {
    expect(getTimeLabel(new Date("2019-11-01Z"))).toBe("Nov 1, 2019")
    expect(getTimeLabel(new Date("2019-12-01Z"))).toBe("Dec 1, 2019")
    expect(getTimeLabel(new Date("2019-12-02Z"))).toBe("Dec 2, 2019")
    expect(getTimeLabel(new Date("2019-12-31T12:00:00Z"))).toBe("12h")
    expect(getTimeLabel(new Date("2019-12-31T23:00:00Z"))).toBe("1h")
    expect(getTimeLabel(new Date("2019-12-31T23:01:00Z"))).toBe("59m")
    expect(getTimeLabel(new Date("2019-12-31T23:59:00Z"))).toBe("1m")
    expect(getTimeLabel(new Date("2019-12-31T23:59:01Z"))).toBe("59s")
    expect(getTimeLabel(new Date("2019-12-31T23:59:59Z"))).toBe("1s")
    expect(getTimeLabel(new Date("2020-01-01T00:00:00Z"))).toBe("1s")
})
