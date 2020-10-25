import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {Storage} from "./Storage"
import {deserializeTweet} from "./util/Serialization"
import {BehaviorSubject, Observable} from "rxjs"
import {filterList} from "@/shared/RxOperators"
import {clone} from "@/shared/ObjectUtil"
import {generateHash} from "@/shared/generateHash"

export class TweetRepositoryImpl implements TweetRepository {
    private readonly tweets: BehaviorSubject<Tweet[]>

    constructor(private storage: Storage) {
        const tweetArray = this.storage.get("tweets", []).map(deserializeTweet)
        this.tweets = new BehaviorSubject(tweetArray)
    }

    getTweetsByUserIds(userIds: string[]): Observable<Tweet[]> {
        return this.tweets.pipe(
            filterList(tweet => userIds.includes(tweet.author.id))
        )
    }

    addTweet(tweet: Tweet) {
        const tweetWithId = clone(tweet, {id: generateHash()})
        this.tweets.next([tweetWithId, ...this.tweets.getValue()])
        this.persistTweets()
    }

    private persistTweets() {
        this.storage.set("tweets", this.tweets.getValue())
    }
}
