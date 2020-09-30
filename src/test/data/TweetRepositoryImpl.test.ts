import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "../../main/data/TweetRepositoryImpl"
import {TweetRepository} from "../../main/domain/repository/TweetRepository"
import {Tweet} from "../../main/domain/model/Tweet"
import {Storage} from "../../main/data/Storage"
import {createTestTweet, createTestUser} from "../testData"
import {expectObservableValue} from "../RxTestUtils"

let tweetRepository: TweetRepository
let storage: Storage

const [user, user2, user3] = [createTestUser(), createTestUser(), createTestUser()]
const tweet = createTestTweet(user)
const anotherTweet = createTestTweet(user)
const tweetFromUser2 = createTestTweet(user2)
const tweetFromUser3 = createTestTweet(user3)

function initializeTweetRepository(tweets: Tweet[]) {
    storage = new FakeStorage({tweets})
    tweetRepository = new TweetRepositoryImpl(storage)
}

it("initializes with no tweets", done => {
    initializeTweetRepository([])
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id]), [], done)
})

it("initializes with some tweets", done => {
    initializeTweetRepository([tweet])
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id]), [tweet], done)
})

it("adds a tweet and puts it before other tweets", done => {
    initializeTweetRepository([tweet])
    tweetRepository.addTweet(anotherTweet)
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id]), [anotherTweet, tweet], done)
})

it("only selects tweets from specified user", done => {
    initializeTweetRepository([tweet, tweetFromUser2, tweetFromUser3])
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id, user2.id]), [tweet, tweetFromUser2], done)
})

it("persists data", done => {
    initializeTweetRepository([])
    tweetRepository.addTweet(tweet)
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expectObservableValue(newTweetRepository.getTweetsByUserIds([user.id]), [tweet], done)
})
