import * as firebase from "@firebase/rules-unit-testing"

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
}

describe("users", () => {
    it("allows to read", () => {
        return firebase.assertSucceeds(db.doc("users/userId").get())
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
})
