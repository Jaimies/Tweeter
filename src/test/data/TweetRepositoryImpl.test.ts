import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {createTestUser} from "../testData"
import {getValue} from "@/shared/RxUtil"
import {Tweet} from "@/domain/model/Tweet"
import {addData, deleteAllDocs, getAdminFirestore, getTestFirestore} from "./FirestoreTestUtils"
import {User} from "@/domain/model/User"
import {generateHash} from "../generateHash"

const [user, user2, user3] = [createTestUser(), createTestUser(), createTestUser()]
const tweet = createTestTweet(user, new Date("2020-01-01"))
const tweetFromUser2 = createTestTweet(user2, new Date("2020-01-02"))
const tweetFromUser3 = createTestTweet(user3, new Date("2020-01-03"))

const db = getTestFirestore(tweet.author.id)
const adminDb = getAdminFirestore()
const adminTweetsCollection = adminDb.collection("tweets")
const tweetRepository = new TweetRepositoryImpl(db)

afterEach(() => deleteAllDocs(adminTweetsCollection))
afterAll(() => db.terminate())

it("selects tweets from specified user", async () => {
    await addData(adminTweetsCollection, [tweet, tweetFromUser2, tweetFromUser3])
    const tweets = tweetRepository.getTweetsByUserIds([user.id, user2.id])
    expect(await getValue(tweets)).toEqual([tweetFromUser2, tweet].map(withValidId))
})

it("addTweet()", async () => {
    await tweetRepository.addTweet(tweet)
    const tweets = tweetRepository.getTweetsByUserIds([user.id])
    expect(await getValue(tweets)).toEqual([withValidId(tweet)])
})

function withValidId(tweet: Tweet) {
    // with non-empty id
    return {...tweet, id: expect.stringMatching(/\S/)}
}

export function createTestTweet(author: User, date: Date): Tweet {
    return new Tweet("", `Tweet body ${generateHash()}`, author, date)
}
