import MockDate from "mockdate"
import {getTimeLabel} from "../../../main/ui/util/getTimeLabel"
import {getTimeSince} from "../../../main/ui/util/getTimeSince"
import {toReadableDate} from "../../../main/ui/util/toReadableDate"

jest.mock("../../../main/ui/util/getTimeSince", () => ({getTimeSince: jest.fn()}))
jest.mock("../../../main/ui/util/toReadableDate", () => ({toReadableDate: jest.fn()}))

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
