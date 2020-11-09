import {StubUserRepository} from "../StubUserRepository"
import {createTestUser, testUser} from "../../../testData"
import {SignUpUseCaseImpl} from "@/domain/usecaseimpl/auth/SignUpUseCaseImpl"
import {StubAuthRepository} from "../StubAuthRepository"
import {MockUserRepository} from "../MockUserRepository"
import {SignUpResult} from "@/domain/repository/AuthRepository"
import {MockAuthRepository} from "../MockAuthRepository"

describe("run()", () => {
    const authRepository = new MockAuthRepository(SignUpResult.EmailTaken)
    const userRepository = new MockUserRepository()
    const useCase = new SignUpUseCaseImpl(authRepository, userRepository)

    afterEach(() => jest.clearAllMocks())

    it("calls login() and addUser() if signUp() returns success", async () => {
        authRepository.signUpResult = new SignUpResult.Success("userId")
        await useCase.run(testUser, "password")
        expect(userRepository.addUser).toBeCalledWith("userId", testUser)
    })

    it("doesn't call call login() and addUser() if signUp() returns an error", async () => {
        authRepository.signUpResult = SignUpResult.EmailTaken
        await useCase.run(testUser, "password")
        expect(userRepository.addUser).not.toBeCalled()
    })
})

describe("check credential availability", () => {
    const existingUser = createTestUser()
    const anotherExistingUser = createTestUser()

    const userRepository = new StubUserRepository([existingUser, anotherExistingUser])
    const useCase = new SignUpUseCaseImpl(new StubAuthRepository(undefined), userRepository)

    it("isEmailAvailable()", async () => {
        expect(await useCase.isEmailAvailable(existingUser.email)).toBe(false)
        expect(await useCase.isEmailAvailable(anotherExistingUser.email)).toBe(false)
        expect(await useCase.isEmailAvailable("newuser@gmail.com")).toBe(true)
    })

    it("isUsernameAvailable()", async () => {
        expect(await useCase.isUsernameAvailable(existingUser.username)).toBe(false)
        expect(await useCase.isUsernameAvailable(anotherExistingUser.username)).toBe(false)
        expect(await useCase.isUsernameAvailable("newUsername")).toBe(true)
    })
})
