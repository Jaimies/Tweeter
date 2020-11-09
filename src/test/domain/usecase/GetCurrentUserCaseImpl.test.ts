import {GetCurrentUserUseCaseImpl} from "@/domain/usecaseimpl/user/GetCurrentUserUseCaseImpl"
import {StubAuthRepository} from "./StubAuthRepository"
import {StubUserRepository} from "./StubUserRepository"
import {testUser} from "../../testData"
import {getValue} from "@/shared/RxUtil"

let useCase: GetCurrentUserUseCaseImpl
let authRepository: StubAuthRepository

beforeEach(() => {
    authRepository = new StubAuthRepository(undefined)
    const userRepository = new StubUserRepository([testUser])
    useCase = new GetCurrentUserUseCaseImpl(authRepository, userRepository)
})

it("returns undefined if there is no signed in user", async () => {
    expect(await getValue(useCase.run())).toBeUndefined()
})

it("returns the current user if one exists", async () => {
    authRepository.userId.next(testUser.id)
    expect(await getValue(useCase.run())).toBe(testUser)
})
