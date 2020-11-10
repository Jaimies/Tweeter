import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {combineLatest, Observable} from "rxjs"
import {collection} from "rxfire/firestore"
import {mapList} from "@/shared/RxOperators"
import {deserializeTweet} from "@/data/util/Serialization"
import {toPlainObject} from "@/shared/ObjectUtil"
import {CollectionReference, DocumentSnapshot, FieldValue, Firestore} from "@/data/Firebase"
import {split} from "@/shared/ArrayUtil"
import {map} from "rxjs/operators"

function documentSnapshotToTweet(snapshot: DocumentSnapshot) {
    return deserializeTweet(snapshot.id, snapshot.data({serverTimestamps: "estimate"}))
}

export class TweetRepositoryImpl implements TweetRepository {
    private tweetsCollection: CollectionReference

    constructor(private db: Firestore) {
        this.tweetsCollection = db.collection("tweets")
    }

    getTweetsByUserIds(userIds: string[]): Observable<Tweet[]> {
        const splitIds = split(userIds, 10)
        const observables = splitIds.map(ids => this.getTweetsByUsers(ids))

        return combineLatest(observables).pipe(
            map(list => list.flat()),
            mapList(documentSnapshotToTweet),
            map(list => list.sort((one, other) => other.date.getTime() - one.date.getTime())),
        )
    }

    private getTweetsByUsers(userIds: string[]) {
        const query = this.tweetsCollection
            .where("author.id", "in", userIds)
            .orderBy("date", "desc")

        return collection(query)
    }

    addTweet(tweet: Tweet) {
        const {id, ...tweetWithoutId} = tweet
        const plainTweet = toPlainObject(tweetWithoutId)
        const tweetWithTimestamp = {...plainTweet, date: FieldValue.serverTimestamp()}
        return this.tweetsCollection.add(tweetWithTimestamp).then(() => {})
    }
}
