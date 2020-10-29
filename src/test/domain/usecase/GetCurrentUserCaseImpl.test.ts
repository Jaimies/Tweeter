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

it("returns undefined if there is no signed in user", async () => {
    expect(await useCase.run()).toBeUndefined()
})

it("returns the current user if one exists", async () => {
    authRepository.userId = testUser.id
    expect(await useCase.run()).toBe(testUser)
})
