import {FakeStorage} from "./FakeStorage"
import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Storage} from "@/data/Storage"
import {createTestTweet, createTestUser} from "../testData"
import {expectObservableValue} from "../RxTestUtils"

let tweetRepository: TweetRepository
let storage: Storage

const [user, user2, user3] = [createTestUser(), createTestUser(), createTestUser()]
const tweet = createTestTweet(user)
const anotherTweet = createTestTweet(user)
const tweetFromUser2 = createTestTweet(user2)
const tweetFromUser3 = createTestTweet(user3)

beforeEach(() => {
    storage = new FakeStorage({tweets: [tweet]})
    tweetRepository = new TweetRepositoryImpl(storage)
})

it("adds a tweet and puts it before other tweets", done => {
    tweetRepository.addTweet(anotherTweet)
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id]), [anotherTweet, tweet], done)
})

it("only selects tweets from specified user", done => {
    tweetRepository.addTweet(tweetFromUser2)
    tweetRepository.addTweet(tweetFromUser3)
    expectObservableValue(tweetRepository.getTweetsByUserIds([user.id, user2.id]), [tweetFromUser2, tweet], done)
})

it("persists data", done => {
    const newTweetRepository = new TweetRepositoryImpl(storage)
    expectObservableValue(newTweetRepository.getTweetsByUserIds([user.id]), [tweet], done)
})
