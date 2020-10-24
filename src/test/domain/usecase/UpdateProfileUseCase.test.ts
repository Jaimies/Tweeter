import {UpdateProfileUseCase} from "@/domain/usecase/user/UpdateProfileUseCase"
import {StubAuthRepository} from "./StubAuthRepository"
import {MockUserRepository} from "./MockUserRepository"

const change = {bio: "New bio", name: "New name"}

const userRepository = new MockUserRepository()
let useCase: UpdateProfileUseCase
let authRepository: StubAuthRepository

beforeEach(() => {
    authRepository = new StubAuthRepository("userid")
    useCase = new UpdateProfileUseCase(userRepository, authRepository)
})

it("updates the user", () => {
    useCase.run(change)
    expect(userRepository.updateUser).toBeCalledWith("userid", change)
})

it("throws if unauthenticated", () => {
    authRepository.userId = undefined
    expect(() => {
        useCase.run(change)
    }).toThrow()
})
