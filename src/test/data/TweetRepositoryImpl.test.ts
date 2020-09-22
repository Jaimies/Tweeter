import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "../../main/data/TweetRepositoryImpl"
import {TweetRepository} from "../../main/domain/repository/TweetRepository"
import {Tweet} from "../../main/domain/model/Tweet"
import {Storage} from "../../main/data/Storage"
import {testTweet} from "../testData"

let tweetRepository: TweetRepository
let storage: Storage

function initializeTweetRepository(tweets: Tweet[]) {
    storage = new FakeStorage({tweets})
    tweetRepository = new TweetRepositoryImpl(storage)
}

it("initializes with no tweets", () => {
    initializeTweetRepository([])
    expect(tweetRepository.getTweets()).toEqual([])
})

it("initializes with some tweets", () => {
    initializeTweetRepository([testTweet])
    expect(tweetRepository.getTweets()).toEqual([testTweet])
})

it("adds a tweet", () => {
    initializeTweetRepository([])
    tweetRepository.addTweet(testTweet)
    expect(tweetRepository.getTweets()).toEqual([testTweet])
})

it("persists data", () => {
    initializeTweetRepository([])
    tweetRepository.addTweet(testTweet)
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expect(newTweetRepository.getTweets()).toEqual([testTweet])
})
