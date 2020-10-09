import {CheckIfLoggedInUseCase} from "@/domain/usecase/CheckIfLoggedInUseCase"
import {StubAuthRepository} from "./StubAuthRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"

let useCase: CheckIfLoggedInUseCase
let authRepository: AuthRepository

beforeEach(() => {
    authRepository = new StubAuthRepository(undefined)
    useCase = new CheckIfLoggedInUseCase(authRepository)
})

it("return false when user is not signed in", () => {
    expect(useCase.run()).toBe(false)
})

it("returns true when user is signed in", () => {
    authRepository.userId = "abc"
    expect(useCase.run()).toBe(true)
})
