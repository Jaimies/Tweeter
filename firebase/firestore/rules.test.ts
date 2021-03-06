import * as firebase from "@firebase/rules-unit-testing"
// @ts-ignore
import FieldValue = firebase.firestore.FieldValue

const appConfig = {projectId: "tweeter-dfa01", auth: {uid: "userId"}}
const app = firebase.initializeTestApp(appConfig)
const adminApp = firebase.initializeAdminApp(appConfig)
const db = app.firestore()
const adminDb = adminApp.firestore()

afterEach(() => firebase.clearFirestoreData(appConfig))
afterAll(() => {
    const terminateDb = db.terminate()
    const terminateAdminDb = adminDb.terminate()
    return Promise.all([terminateDb, terminateAdminDb])
})

const userData = {
    username: "User",
    username_lowercase: "user",
    name: "User",
    email: "user@mail.com",
    bio: "Bio",
    following: [],
    followers: [],
}

describe("users", () => {
    it("allows to read", () => {
        return firebase.assertSucceeds(db.doc("users/userId").get())
    })

    it("disallows creating users that are already followed by someone", () => {
        const document = db.doc("users/userId")
        const followedUser = {...userData, followers: ["someId"]}
        return firebase.assertFails(document.set(followedUser))
    })

    it("allows user to create their profile", () => {
        const document = db.doc("users/userId")
        return firebase.assertSucceeds(document.set(userData))
    })

    it("disallows to create someone else's profile", () => {
        const document = db.doc("users/otherId")
        return firebase.assertFails(document.set(userData))
    })

    it("disallows to post if username_lowercase is not the lowercase version of username", () => {
        const document = db.doc("users/userId")
        const incorrectUserData = {...userData, username_lowercase: "otherUsername"}
        return firebase.assertFails(document.set(incorrectUserData))
    })
})

describe("tweets", () => {
    it("allows to read", () => {
        return firebase.assertSucceeds(db.doc("tweets/tweetId").get())
    })

    const tweetData = {
        body: "Tweet body",
        author: {
            id: "userId",
            username: userData.username,
            name: userData.name,
        },
        date: firebase.firestore.FieldValue.serverTimestamp(),
        likedBy: [],
    }

    function addTweetToAdminDb(tweet: object) {
        adminDb.doc("tweets/tweetId").set({...tweet, date: new Date()})
    }

    beforeEach(() => adminDb.doc("users/userId").set(userData))

    it("allows user to post on behalf of themselves", () => {
        const document = db.doc("tweets/tweetId")
        return firebase.assertSucceeds(document.set(tweetData))
    })

    it("disallows posting on behalf of someone else's id", () => {
        const document = db.doc("tweets/tweetId")
        const tweetByOtherUser = {...tweetData, author: {...tweetData.author, id: "otherId"}}
        return firebase.assertFails(document.set(tweetByOtherUser))
    })

    it("disallows posting with someone else's name", () => {
        const document = db.doc("tweets/tweetId")
        const tweetByOtherUser = {...tweetData, author: {...tweetData.author, name: "Other User"}}
        return firebase.assertFails(document.set(tweetByOtherUser))
    })

    it("disallows posting with some else's username", () => {
        const document = db.doc("tweets/tweetId")
        const tweetByOtherUser = {...tweetData, author: {...tweetData.author, username: "otherUser"}}
        return firebase.assertFails(document.set(tweetByOtherUser))
    })

    it("disallows posting with date other than server timestamp", () => {
        const document = db.doc("tweets/tweetId")
        const tweetWithOldTimestamp = {...tweetData, date: new Date()}
        return firebase.assertFails(document.set(tweetWithOldTimestamp))
    })

    it("disallows posting if the initial value of likedBy is not `[]`", () => {
        const document = db.doc("tweets/tweetId")
        const tweetWithInitialLikes = {...tweetData, likedBy: ["otherId"]}
        return firebase.assertFails(document.set(tweetWithInitialLikes))
    })

    it("allows to like a tweet on behalf of yourself", () => {
        const document = db.doc("tweets/tweetId")
        document.set(tweetData)
        return firebase.assertSucceeds(document.update("likedBy", FieldValue.arrayUnion("userId")))
    })

    it("disallows liking a tweet on behalf of someone else", () => {
        const document = db.doc("tweets/tweetId")
        document.set(tweetData)
        return firebase.assertFails(document.update("likedBy", FieldValue.arrayUnion("otherId")))
    })

    it("disallows unliking on behalf of someone else while liking on behalf of yourself", () => {
        const document = db.doc("tweets/tweetId")
        addTweetToAdminDb({...tweetData, likedBy: ["otherId"]})
        return firebase.assertFails(document.update("likedBy", ["userId"]))
    })

    it("allows unliking a tweet on behalf of yourself", () => {
        const document = db.doc("tweets/tweetId")
        addTweetToAdminDb({...tweetData, likedBy: ["userId"]})
        return firebase.assertSucceeds(document.update("likedBy", FieldValue.arrayRemove("userId")))
    })

    it("disallows unliking a tweet on behalf of someone else", () => {
        const document = db.doc("tweets/tweetId")
        addTweetToAdminDb({...tweetData, likedBy: "otherId"})
        return firebase.assertFails(document.update("likedBy", FieldValue.arrayRemove("otherId")))
    })

    it("disallows liking on behalf of someone else while unliking on behalf of yourself", () => {
        const document = db.doc("tweets/tweetId")
        addTweetToAdminDb({...tweetData, likedBy: ["userId"]})
        return firebase.assertFails(document.update("likedBy", ["otherId"]))
    })
})
