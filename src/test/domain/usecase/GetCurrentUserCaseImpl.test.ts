import {GetCurrentUserUseCaseImpl} from "@/domain/usecaseimpl/user/GetCurrentUserUseCaseImpl"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {StubAuthRepository} from "./StubAuthRepository"
import {StubUserRepository} from "./StubUserRepository"
import {testUser} from "../../testData"

let useCase: GetCurrentUserUseCaseImpl
let authRepository: AuthRepository

beforeEach(() => {
    authRepository = new StubAuthRepository(undefined)
    const userRepository = new StubUserRepository([testUser])
    useCase = new GetCurrentUserUseCaseImpl(authRepository, userRepository)
})

it("returns undefined if there is no signed in user", () => {
    expect(useCase.run()).toBeUndefined()
})

it("returns the current user if one exists", () => {
    authRepository.userId = testUser.id
    expect(useCase.run()).toBe(testUser)
})
