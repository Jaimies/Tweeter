import {PostTweetUseCase} from "@/domain/usecase/tweet/PostTweetUseCase"
import {MockTweetRepository} from "./MockTweetRepository"
import {StubGetCurrentUserUseCase} from "./StubGetCurrentUserUseCase"
import {testUser} from "../../testData"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {Tweet} from "@/domain/model/Tweet"
import MockDate from "mockdate"

const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(testUser)
const useCase = new PostTweetUseCase(tweetRepository, getCurrentUserUseCase as unknown as GetCurrentUserUseCase)

const currentDate = new Date()

beforeAll(() => MockDate.set(currentDate))

it("calls addTweet() with the right arguments", () => {
    useCase.run("Tweet body")
    expect(tweetRepository.addTweet).toBeCalledWith(
        new Tweet("Tweet body", testUser, currentDate)
    )
})

it("throws if unauthenticated", () => {
    getCurrentUserUseCase.user = undefined
    expect(() => useCase.run("Tweet body")).toThrow()
})
