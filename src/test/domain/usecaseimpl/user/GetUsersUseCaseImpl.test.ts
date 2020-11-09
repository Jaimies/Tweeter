import {GetUsersUseCaseImpl} from "@/domain/usecaseimpl/user/GetUsersUseCaseImpl"
import {StubUserRepository} from "../StubUserRepository"
import {createTestUser} from "../../../testData"
import {StubAuthRepository} from "../StubAuthRepository"

const [user, anotherUser] = [createTestUser(), createTestUser()]
const userRepository = new StubUserRepository([user, anotherUser])
const authRepository = new StubAuthRepository(user.id)
const useCase = new GetUsersUseCaseImpl(userRepository, authRepository)

it("returns all users except for the currently signed in one", async () => {
    expect(await useCase.run()).toEqual([anotherUser])
})

it("returns all users if unauthenticated", async () => {
    authRepository.userId.next(undefined)
    expect(await useCase.run()).toEqual([user, anotherUser])
})
