import {StubUserRepository} from "./StubUserRepository"
import {createTestUser} from "../../testData"
import {SignUpUseCaseImpl} from "@/domain/usecaseimpl/auth/SignUpUseCaseImpl"
import {StubAuthRepository} from "./StubAuthRepository"

const existingUser = createTestUser()
const anotherExistingUser = createTestUser()

const userRepository = new StubUserRepository([existingUser, anotherExistingUser])
const useCase = new SignUpUseCaseImpl(new StubAuthRepository(undefined), userRepository)

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
