import {GetCurrentUserUseCase} from "@/domain/usecase/GetCurrentUserUseCase"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {StubAuthRepository} from "./StubAuthRepository"
import {StubUserRepository} from "./StubUserRepository"
import {testUser} from "../../testData"

let useCase: GetCurrentUserUseCase
let authRepository: AuthRepository

beforeEach(() => {
    authRepository = new StubAuthRepository(undefined)
    const userRepository = new StubUserRepository([testUser])
    useCase = new GetCurrentUserUseCase(authRepository, userRepository)
})

it("returns undefined if there is no signed in user", () => {
    expect(useCase.run()).toBeUndefined()
})

it("returns the current user if one exists", () => {
    authRepository.userId = testUser.id
    expect(useCase.run()).toBe(testUser)
})
