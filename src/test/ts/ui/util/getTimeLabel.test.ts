import MockDate from "mockdate"
import {getTimeLabel} from "../../../../main/ts/ui/util/getTimeLabel"
import {getTimeSince} from "../../../../main/ts/ui/util/getTimeSince"
import {toReadableDate} from "../../../../main/ts/ui/util/toReadableDate"

jest.mock("../../../../main/ts/ui/util/getTimeSince", () => ({getTimeSince: jest.fn()}))
jest.mock("../../../../main/ts/ui/util/toReadableDate", () => ({toReadableDate: jest.fn()}))

beforeAll(() => MockDate.set("2020-01-01Z"))
afterAll(() => MockDate.reset())

it("calls getTimeSince", () => {
    getTimeLabel(new Date("2019-12-01Z"))
    expect(toReadableDate).toBeCalled()
})

it("calls toReadableDate", () => {
    getTimeLabel(new Date("2019-12-31T22:00:00Z"))
    expect(getTimeSince).toBeCalled()
})