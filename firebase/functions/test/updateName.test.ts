import {clearFirestoreData, initializeAdminApp} from "@firebase/rules-unit-testing"

const appOptions = {projectId: "tweeter-dfa01"}
const app = initializeAdminApp(appOptions)
const db = app.firestore()

afterAll(() => clearFirestoreData(appOptions))

it("updates author.name in user's tweets", async done => {
    const author = {name: "Old Name"}
    const userDoc = await db.collection("users").add(author)
    const tweet = {author: {name: "Old Name", id: userDoc.id}}
    const tweetDoc = await db.collection("tweets").add(tweet)
    await userDoc.update("name", "New Name")

    const unsubscribe = tweetDoc.onSnapshot(snapshot => {
        if (snapshot.data()!.author.name == "New Name") {
            unsubscribe()
            done()
        }
    })
})
