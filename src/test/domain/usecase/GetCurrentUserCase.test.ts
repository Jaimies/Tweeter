import {GetCurrentUserUseCase} from "../../../main/domain/usecase/GetCurrentUserUseCase"
import {StubAuthRepository} from "./StubAuthRepository"
import {StubUserRepository} from "./StubUserRepository"
import {testUser} from "../../testData"

let useCase: GetCurrentUserUseCase

function initializeUseCase(userId: string | undefined) {
    const authRepository = new StubAuthRepository(userId)
    const userRepository = new StubUserRepository([testUser])
    useCase = new GetCurrentUserUseCase(authRepository, userRepository)
}

it("returns undefined if there is no signed in user", () => {
    initializeUseCase(undefined)
    expect(useCase.run()).toBeUndefined()
})

it("returns the current user if one exists", () => {
    initializeUseCase(testUser.id)
    expect(useCase.run()).toBe(testUser)
})
