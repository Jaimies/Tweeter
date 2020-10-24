import {PostTweetUseCaseImpl} from "@/domain/usecaseimpl/tweet/PostTweetUseCaseImpl"
import {MockTweetRepository} from "./MockTweetRepository"
import {StubGetCurrentUserUseCase} from "./StubGetCurrentUserUseCase"
import {testUser} from "../../testData"
import {GetCurrentUserUseCaseImpl} from "@/domain/usecaseimpl/user/GetCurrentUserUseCaseImpl"
import {Tweet} from "@/domain/model/Tweet"
import MockDate from "mockdate"

const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(testUser)
const useCase = new PostTweetUseCaseImpl(tweetRepository, getCurrentUserUseCase as unknown as GetCurrentUserUseCaseImpl)

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
