import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {Observable} from "rxjs"
import {Firestore} from "@/data/Firebase";
import {collectionData} from "rxfire/firestore";
import firebase from "firebase/app"
import {mapList} from "@/shared/RxOperators";
import {deserializeTweet} from "@/data/util/Serialization";
import CollectionReference = firebase.firestore.CollectionReference;
import {toPlainObject} from "@/shared/ObjectUtil";

export class TweetRepositoryImpl implements TweetRepository {
    private tweetsCollection: CollectionReference

    constructor(private db: Firestore) {
        this.tweetsCollection = db.collection("tweets")
    }

    getTweetsByUserIds(userIds: string[]): Observable<Tweet[]> {
        const query = this.tweetsCollection
            .where("author.id", "in", userIds)
            .orderBy("date", "desc")

        return collectionData(query).pipe(
            mapList(deserializeTweet)
        )
    }

    addTweet(tweet: Tweet) {
        return this.tweetsCollection.add(toPlainObject(tweet))
    }
}
