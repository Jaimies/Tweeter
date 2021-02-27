import {PostTweetUseCaseImpl} from "@/domain/usecaseimpl/tweet/PostTweetUseCaseImpl"
import {MockTweetRepository} from "../MockTweetRepository"
import {StubGetCurrentUserUseCase} from "../StubGetCurrentUserUseCase"
import {testUser} from "../../../testData"
import {Tweet} from "@/domain/model/Tweet"
import MockDate from "mockdate"
import {TweetAuthor} from "@/domain/model/TweetAuthor"

const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(testUser)
const useCase = new PostTweetUseCaseImpl(tweetRepository, getCurrentUserUseCase)

const currentDate = new Date()

beforeAll(() => MockDate.set(currentDate))

it("calls addTweet() with the right arguments", async () => {
    await useCase.run("Tweet body")
    expect(tweetRepository.addTweet).toBeCalledWith(
        new Tweet("", "Tweet body", TweetAuthor.from(testUser), currentDate, []),
    )
})

it("throws if unauthenticated", () => {
    getCurrentUserUseCase.user = undefined
    expect(useCase.run("Tweet body")).rejects.toThrow()
})
