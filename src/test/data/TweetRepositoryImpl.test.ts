import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {TweetRepository} from "@/domain/repository/TweetRepository"
import {createTestTweet, createTestUser} from "../testData"
import {expectObservableValue} from "../RxTestUtils"
import {Tweet} from "@/domain/model/Tweet"
import {Firestore, getFirestore} from "@/data/Firebase";
import {toPlainObject} from "@/shared/ObjectUtil";

const [user, user2, user3] = [createTestUser(), createTestUser(), createTestUser()]
const tweet = createTestTweet(user, new Date("2020-01-01"))
const tweetFromUser2 = createTestTweet(user2, new Date("2020-01-03"))
const tweetFromUser3 = createTestTweet(user3, new Date("2020-01-04"))

let db: Firestore
let tweetRepository: TweetRepository

beforeAll(async () => {
    const firestore = getFirestore()
    await firestore.disableNetwork()
    db = getFirestore()
    tweetRepository = new TweetRepositoryImpl(db)
})

afterEach(async () => {
    const snapshot = await db.collection("tweets").get()
    snapshot.docs.forEach(doc => doc.ref.delete())
})

function addTweetsToDB(tweets: Tweet[]) {
    for (const tweet of tweets) {
        db.collection("tweets").add(toPlainObject(tweet))
    }
}

it("selects tweets from specified user", () => {
    addTweetsToDB([tweet, tweetFromUser2, tweetFromUser3])
    const tweets = tweetRepository.getTweetsByUserIds([user.id, user2.id])
    return expectObservableValue(tweets, [tweetFromUser2, tweet])
})

it("adds a tweet", () => {
    tweetRepository.addTweet(tweet)
    const tweets = tweetRepository.getTweetsByUserIds([user.id])
    return expectObservableValue(tweets, [withAnyId(tweet)])

    function withAnyId(tweet: Tweet) {
        return {...tweet, id: expect.any(String)}
    }
})

