import {GetAuthStateUseCaseImpl} from "@/domain/usecaseimpl/auth/GetAuthStateUseCaseImpl"
import {StubAuthRepository} from "./StubAuthRepository"
import {AuthState} from "@/domain/model/AuthState"

const authRepository = new StubAuthRepository(undefined)
const useCase = new GetAuthStateUseCaseImpl(authRepository)

it("returns Unauthenticated if the user is not logged in", async () => {
    expect(await useCase.run()).toBe(AuthState.Unauthenticated)
})

it("returns Authenticated if the user is logged in", async () => {
    authRepository.userId.next("someId")
    expect(await useCase.run()).toBe(AuthState.Authenticated)
})
