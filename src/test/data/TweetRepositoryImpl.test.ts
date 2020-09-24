import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "../../main/data/TweetRepositoryImpl"
import {TweetRepository} from "../../main/domain/repository/TweetRepository"
import {Tweet} from "../../main/domain/model/Tweet"
import {Storage} from "../../main/data/Storage"
import {createTestTweet, createTestUser} from "../testData"
import {expectObservableValue} from "../RxTestUtils"

let tweetRepository: TweetRepository
let storage: Storage

const user = createTestUser()
const anotherUser = createTestUser()
const tweet = createTestTweet(user)
const anotherTweet = createTestTweet(user)
const tweetFromAnotherUser = createTestTweet(anotherUser)

function initializeTweetRepository(tweets: Tweet[]) {
    storage = new FakeStorage({tweets})
    tweetRepository = new TweetRepositoryImpl(storage)
}

it("initializes with no tweets", done => {
    initializeTweetRepository([])
    expectObservableValue(tweetRepository.getTweetsByUserId(user.id), [], done)
})

it("initializes with some tweets", done => {
    initializeTweetRepository([tweet])
    expectObservableValue(tweetRepository.getTweetsByUserId(user.id), [tweet], done)
})

it("adds a tweet and puts it before other tweets", done => {
    initializeTweetRepository([tweet])
    tweetRepository.addTweet(anotherTweet)
    expectObservableValue(tweetRepository.getTweetsByUserId(user.id), [anotherTweet, tweet], done)
})

it("only selects tweets from specified user", done => {
    initializeTweetRepository([tweet, tweetFromAnotherUser])
    expectObservableValue(tweetRepository.getTweetsByUserId(user.id), [tweet], done)
})

it("persists data", done => {
    initializeTweetRepository([])
    tweetRepository.addTweet(tweet)
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expectObservableValue(newTweetRepository.getTweetsByUserId(user.id), [tweet], done)
})
