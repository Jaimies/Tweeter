import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "../../main/data/TweetRepositoryImpl"
import {TweetRepository} from "../../main/domain/repository/TweetRepository"
import {Tweet} from "../../main/domain/model/Tweet"
import {Storage} from "../../main/data/Storage"
import {testTweet} from "../testData"
import {expectObservableValue} from "../RxTestUtils"

let tweetRepository: TweetRepository
let storage: Storage

function initializeTweetRepository(tweets: Tweet[]) {
    storage = new FakeStorage({tweets})
    tweetRepository = new TweetRepositoryImpl(storage)
}

it("initializes with no tweets", done => {
    initializeTweetRepository([])
    expectObservableValue(tweetRepository.getTweets(), [], done)
})

it("initializes with some tweets", done => {
    initializeTweetRepository([testTweet])
    expectObservableValue(tweetRepository.getTweets(), [testTweet], done)
})

it("adds a tweet", done => {
    initializeTweetRepository([])
    tweetRepository.addTweet(testTweet)
    expectObservableValue(tweetRepository.getTweets(), [testTweet], done)
})

it("persists data", done => {
    initializeTweetRepository([])
    tweetRepository.addTweet(testTweet)
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expectObservableValue(newTweetRepository.getTweets(), [testTweet], done)
})
