import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {Observable} from "rxjs"
import {collectionData} from "rxfire/firestore"
import {mapList} from "@/shared/RxOperators"
import {deserializeTweet} from "@/data/util/Serialization"
import {toPlainObject} from "@/shared/ObjectUtil"
import {CollectionReference, Firestore} from "@/data/Firebase"

export class TweetRepositoryImpl implements TweetRepository {
    private tweetsCollection: CollectionReference

    constructor(private db: Firestore) {
        this.tweetsCollection = db.collection("tweets")
    }

    getTweetsByUserIds(userIds: string[]): Observable<Tweet[]> {
        const query = this.tweetsCollection
            .where("author.id", "in", userIds)
            .orderBy("date", "desc")

        return collectionData(query, "id").pipe(
            mapList(deserializeTweet),
        )
    }

    addTweet(tweet: Tweet) {
        const {id, ...tweetWithoutId} = tweet
        const plainTweet = toPlainObject(tweetWithoutId)
        return this.tweetsCollection.add(plainTweet).then(() => {})
    }
}
