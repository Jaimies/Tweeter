import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {Observable} from "rxjs"
import {collection} from "rxfire/firestore"
import {mapList} from "@/shared/RxOperators"
import {deserializeTweet} from "@/data/util/Serialization"
import {toPlainObject} from "@/shared/ObjectUtil"
import {CollectionReference, DocumentSnapshot, FieldValue, Firestore} from "@/data/Firebase"

function documentSnapshotToTweet(snapshot: DocumentSnapshot) {
    return deserializeTweet(snapshot.id, snapshot.data({serverTimestamps: "estimate"}))
}

export class TweetRepositoryImpl implements TweetRepository {
    private tweetsCollection: CollectionReference

    constructor(private db: Firestore) {
        this.tweetsCollection = db.collection("tweets")
    }

    getTweetsByUserIds(userIds: string[]): Observable<Tweet[]> {
        const query = this.tweetsCollection
            .where("author.id", "in", userIds)
            .orderBy("date", "desc")

        return collection(query).pipe(
            mapList(documentSnapshotToTweet),
        )
    }

    addTweet(tweet: Tweet) {
        const {id, ...tweetWithoutId} = tweet
        const plainTweet = toPlainObject(tweetWithoutId)
        const tweetWithTimestamp = {...plainTweet, date: FieldValue.serverTimestamp()}
        return this.tweetsCollection.add(tweetWithTimestamp).then(() => {})
    }
}
