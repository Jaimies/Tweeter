import {CheckCredentialAvailabilityUseCase} from "../../../main/domain/usecase/CheckCredentialAvailabilityUseCase"
import {StubUserRepository} from "./StubUserRepository"
import {createTestUser} from "../../testData"

const existingUser = createTestUser()
const anotherExistingUser = createTestUser()

const userRepository = new StubUserRepository([existingUser, anotherExistingUser])
const useCase = new CheckCredentialAvailabilityUseCase(userRepository)

it("isEmailAvailable()", () => {
    expect(useCase.isEmailAvailable(existingUser.email)).toBe(false)
    expect(useCase.isEmailAvailable(anotherExistingUser.email)).toBe(false)
    expect(useCase.isEmailAvailable("newuser@gmail.com")).toBe(true)
})

it("isUserIdAvailable()", () => {
    expect(useCase.isUserIdAvailable(existingUser.id)).toBe(false)
    expect(useCase.isUserIdAvailable(anotherExistingUser.id)).toBe(false)
    expect(useCase.isUserIdAvailable("newid")).toBe(true)
})
