import * as firebase from "@firebase/rules-unit-testing"

const appConfig = {projectId: "tweeter-dfa01", auth: {uid: "userId"}}
const app = firebase.initializeTestApp(appConfig)
const db = app.firestore()

afterEach(() => firebase.clearFirestoreData(appConfig))
afterAll(() => db.terminate())

describe("users", () => {
    it("allows to read", () => {
        return firebase.assertSucceeds(db.doc("users/userId").get())
    })

    const userData = {
        username: "user",
        name: "User",
        email: "user@mail.com",
        bio: "Bio",
        following: [],
    }

    it("allows user to create their profile", () => {
        const document = db.doc("users/userId")
        return firebase.assertSucceeds(document.set(userData))
    })

    it("disallows to create someone else's profile", () => {
        const document = db.doc("users/otherId")
        return firebase.assertFails(document.set(userData))
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
            username: "username",
            name: "Author's name",
        },
        date: firebase.firestore.FieldValue.serverTimestamp(),
    }

    it("allows user to post on behalf of themselves", () => {
        const document = db.doc("tweets/tweetId")
        return firebase.assertSucceeds(document.set(tweetData))
    })

    it("disallows posting on behalf of someone else", () => {
        const document = db.doc("tweets/tweetId")
        const tweetByOtherUser = {...tweetData, author: {...tweetData.author, id: "otherId"}}
        return firebase.assertFails(document.set(tweetByOtherUser))
    })

    it("disallows posting with date other than server timestamp", () => {
        const document = db.doc("tweets/tweetId")
        const tweetWithOldTimestamp = {...tweetData, date: new Date()}
        return firebase.assertFails(document.set(tweetWithOldTimestamp))
    })
})
