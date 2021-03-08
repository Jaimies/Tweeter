import {clearFirestoreData} from "@firebase/rules-unit-testing"
import {appOptions, getFirestore} from "./FirebaseTestUtils"

const db = getFirestore()

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
