import {appOptions, getFirestore} from "./FirebaseTestUtils"
import {clearFirestoreData} from "@firebase/rules-unit-testing"
import {equals} from "../src/ArrayUtil"

const db = getFirestore()

const userDoc = db.doc("users/userId")
const otherUserDoc = db.doc("users/otherUserId")

afterEach(() => clearFirestoreData(appOptions))

it("adds a follower when someone starts following a user", async done => {
    await userDoc.set({ following: [] })
    await otherUserDoc.set({ followers: [], following: [] })
    await userDoc.update("following", ["otherUserId"])

    const unsubscribe = otherUserDoc.onSnapshot(snapshot => {
        if (equals(snapshot.data()!.followers, ["userId"])) {
            unsubscribe()
            done()
        }
    })
})

it("removes a follower when someone unfollows a user", async done => {
    await userDoc.set({ following: ["otherUserId"] })
    await otherUserDoc.set({ followers: ["userId"], following: [] })
    await userDoc.update("following", [])

    const unsubscribe = otherUserDoc.onSnapshot(snapshot => {
        if (snapshot.data()!.followers.length == 0) {
            unsubscribe()
            done()
        }
    })
})
