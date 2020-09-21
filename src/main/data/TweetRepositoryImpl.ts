import {TweetRepository} from "../domain/repository/TweetRepository"
import {Tweet} from "../domain/model/Tweet"
import {Storage} from "./Storage"
import {deserializeTweet} from "./util/Serialization"

export class TweetRepositoryImpl implements TweetRepository {
    private readonly tweets: Tweet[]

    constructor(private storage: Storage) {
        this.tweets = this.storage.get("tweets", []).map(deserializeTweet)
    }

    getTweets(): Tweet[] {
        return this.tweets
    }

    postTweet(tweet: Tweet) {
        this.tweets.unshift(tweet)
        this.persistTweets()
    }

    private persistTweets() {
        this.storage.set("tweets", this.tweets)
    }
}
