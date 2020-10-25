import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Storage} from "@/data/Storage"
import {createTestTweet, createTestUser} from "../testData"
import {expectObservableValue} from "../RxTestUtils"
import {Tweet} from "@/domain/model/Tweet"

const [user, user2, user3] = [createTestUser(), createTestUser(), createTestUser()]
const tweet = createTestTweet(user)
const anotherTweet = createTestTweet(user)
const tweetFromUser2 = createTestTweet(user2)
const tweetFromUser3 = createTestTweet(user3)

function createStorage(tweets: Tweet[]): Storage {
    return new FakeStorage({tweets})
}

function createRepository(tweets: Tweet[]) : TweetRepository {
    return new TweetRepositoryImpl(createStorage(tweets))
}

it("adds a tweet and puts it before other tweets", done => {
    const tweetRepository = createRepository([tweet])
    tweetRepository.addTweet(anotherTweet)
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id]), [anotherTweet, tweet], done)
})

it("only selects tweets from specified user", done => {
    const tweetRepository = createRepository([tweet, tweetFromUser2, tweetFromUser3])
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id, user2.id]), [tweet, tweetFromUser2], done)
})

it("persists data", done => {
    const storage = createStorage([tweet])
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expectObservableValue(newTweetRepository.getTweetsByUserIds([user.id]), [tweet], done)
})
