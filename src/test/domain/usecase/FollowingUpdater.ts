import {FollowingUpdater} from "@/domain/usecaseimpl/follow/FollowingUpdater"
import {StubAuthRepository} from "./StubAuthRepository"
import {MockUserRepository} from "./MockUserRepository"
import {ListChange} from "@/domain/model/ListChange"
import {testUser} from "../../testData"

const authRepository = new StubAuthRepository(undefined)
const userRepository = new MockUserRepository()
const useCase = new FollowingUpdater(authRepository, userRepository)

const errorMessage = "Cannot perform action without auth"
const followingChange = new ListChange.Add("otherId")

afterEach(() => {
    jest.clearAllMocks()
    authRepository.userId.next(undefined)
})

it("calls updateUser() with username and followingChange", async () => {
    authRepository.userId.next(testUser.id)
    await useCase.run(followingChange, errorMessage)
    expect(userRepository.updateUser).toBeCalledWith(testUser.id, {
        following: followingChange
    })
})

it("throws if unauthenticated", () => {
    return expect(useCase.run(followingChange, errorMessage)).rejects.toThrow()
})
