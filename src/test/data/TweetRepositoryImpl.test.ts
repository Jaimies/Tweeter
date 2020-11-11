import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {createTestUser} from "../testData"
import {getValue} from "@/shared/RxUtil"
import {Tweet} from "@/domain/model/Tweet"
import {addData, clearData, getAdminFirestore, getTestFirestore} from "./FirestoreTestUtils"
import {generateHash} from "../generateHash"
import {TweetAuthor} from "@/domain/model/TweetAuthor"
import {User} from "@/domain/model/User"
import {toPlainObject} from "@/shared/ObjectUtil"

jest.mock('@/data/Firebase', () => ({
    // @ts-expect-error
    ...jest.requireActual('@/data/Firebase'),
    FieldValue: require("@firebase/rules-unit-testing").firestore.FieldValue,
}))

const [user, user2, user3] = [createTestUser(), createTestUser(), createTestUser()]
const tweet = createTestTweet(user, new Date("2020-01-01"))
const tweetFromUser2 = createTestTweet(user2, new Date("2020-01-02"))
const tweetFromUser3 = createTestTweet(user3, new Date("2020-01-03"))

const db = getTestFirestore(tweet.author.id)
const adminDb = getAdminFirestore()
const adminTweetsCollection = adminDb.collection("tweets")
const tweetRepository = new TweetRepositoryImpl(db)

afterEach(() => clearData())
afterAll(() => db.terminate())

describe("getTweetsByUserIds()", () => {
    it("gets the tweets", async () => {
        await addData(adminTweetsCollection, [tweet, tweetFromUser2, tweetFromUser3])
        const tweets = tweetRepository.getTweetsByUserIds([user.id, user2.id])
        expect(await getValue(tweets)).toEqual([tweetFromUser2, tweet].map(withValidId))
    })

    it("gets tweets from more than 10 users", async () => {
        await addData(adminTweetsCollection, [tweet])
        const userIds = [user.id, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", user2.id]
        const tweets = tweetRepository.getTweetsByUserIds(userIds)
        expect(await getValue(tweets)).toEqual([withValidId(tweet)])
    })
})

it("addTweet()", async () => {
    await adminDb.doc(`users/${user.id}`).set(toPlainObject(user))
    const tweets$ = tweetRepository.getTweetsByUserIds([user.id])
    const subscriber = jest.fn()
    tweets$.subscribe(subscriber)
    await tweetRepository.addTweet(tweet)
    expect(subscriber).toBeCalledWith([withAnyDateAndValidId(tweet)])
})

function withValidId(tweet: Tweet) {
    // with non-empty id
    return {...tweet, id: expect.stringMatching(/\S/)}
}

function withAnyDateAndValidId(tweet: Tweet) {
    return {...withValidId(tweet), date: expect.any(Date)}
}

export function createTestTweet(author: User, date: Date): Tweet {
    return new Tweet("", `Tweet body ${generateHash()}`, TweetAuthor.from(author), date)
}
