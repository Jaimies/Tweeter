import {StubAuthRepository} from "../../../domain/usecaseimpl/StubAuthRepository"
import {UiTweetMapperImpl} from "@/ui/model/mapperimpl/UiTweetMapperImpl"
import {UiTweetMapper} from "@/ui/model/mapper/UiTweetMapper"
import {createTestTweet} from "../../../data/TweetRepositoryImpl.test"
import {createTestUser} from "../../../testData"

function createMapper(userId: string | undefined) : UiTweetMapper {
    const authRepository = new StubAuthRepository(userId)
    return new UiTweetMapperImpl(authRepository)
}

const userId = "userId123"
const otherUserId = "userId456"

it("isLiked is false if the tweet is not liked by the current user", async () => {
    const mapper = createMapper(userId)
    const tweet = createTestTweet(createTestUser(), new Date(), [otherUserId])
    const uiTweet = await mapper.map(tweet)
    expect(uiTweet.isLiked).toBe(false)
})

it("isLiked is true if the tweet is liked by the current user", async () => {
    const mapper = createMapper(userId)
    const tweet = createTestTweet(createTestUser(), new Date(), [userId])
    const uiTweet = await mapper.map(tweet)
    expect(uiTweet.isLiked).toBe(true)
})
