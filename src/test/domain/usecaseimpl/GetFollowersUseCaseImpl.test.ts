import {GetFollowersUseCaseImpl} from "@/domain/usecaseimpl/follow/GetFollowersUseCaseImpl"
import {createTestUser} from "../../testData"
import {StubUserRepository} from "./StubUserRepository"

const user = createTestUser("userId", ["otherUserId"], ["otherUserId", "thirdUserId"])
const otherUser = createTestUser("otherUserId", ["userId"], ["userId", "thirdUserId"])
const thirdUser = createTestUser("thirdUserId", ["userId", "otherUserId"])

const userRepository = new StubUserRepository([user, otherUser, thirdUser])
const useCase = new GetFollowersUseCaseImpl(userRepository)

it("getFollowersByUsername()", async () => {
    const followers = await useCase.getFollowersByUsername(user.username)
    expect(followers).toEqual([otherUser, thirdUser])
})

it("getFollowingByUsername()", async () => {
    const following = await useCase.getFollowingByUsername(thirdUser.username)
    expect(following).toEqual([user, otherUser])
})
