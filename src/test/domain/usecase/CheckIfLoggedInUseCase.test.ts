import {CheckIfLoggedInUseCase} from "../../../main/domain/usecase/CheckIfLoggedInUseCase"
import {StubAuthRepository} from "./StubAuthRepository"

let useCase: CheckIfLoggedInUseCase

function initializeUseCase(userId: string | undefined) {
    useCase = new CheckIfLoggedInUseCase(new StubAuthRepository(userId))
}

it("return false when user is not signed in", () => {
    initializeUseCase(undefined)
    expect(useCase.run()).toBe(false)
})

it("returns true when user is signed in", () => {
    initializeUseCase("abc")
    expect(useCase.run()).toBe(true)
})
