import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "../../main/data/TweetRepositoryImpl"
import {TweetRepository} from "../../main/domain/repository/TweetRepository"
import {Tweet} from "../../main/domain/model/Tweet"
import {User} from "../../main/domain/model/User"
import {Storage} from "../../main/data/Storage"

const testUser = new User("testuser", "Test User", "testuser@gmail.com")
const testTweet = new Tweet("Tweet body", testUser, new Date())

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

it("posts a tweet", () => {
    initializeTweetRepository([])
    tweetRepository.postTweet(testTweet)
    expect(tweetRepository.getTweets()).toEqual([testTweet])
})

it("persists data", () => {
    initializeTweetRepository([])
    tweetRepository.postTweet(testTweet)
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expect(newTweetRepository.getTweets()).toEqual([testTweet])
})
