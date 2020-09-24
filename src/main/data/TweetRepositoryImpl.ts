import {TweetRepository} from "../domain/repository/TweetRepository"
import {Tweet} from "../domain/model/Tweet"
import {Storage} from "./Storage"
import {deserializeTweet} from "./util/Serialization"
import {BehaviorSubject, Observable} from "rxjs"

export class TweetRepositoryImpl implements TweetRepository {
    private readonly tweets: BehaviorSubject<Tweet[]>

    constructor(private storage: Storage) {
        const tweetArray = this.storage.get("tweets", []).map(deserializeTweet)
        this.tweets = new BehaviorSubject(tweetArray)
    }

    getTweets(): Observable<Tweet[]> {
        return this.tweets
    }

    addTweet(tweet: Tweet) {
        this.tweets.next([tweet, ...this.tweets.getValue()])
        this.persistTweets()
    }

    private persistTweets() {
        this.storage.set("tweets", this.tweets.getValue())
    }
}
