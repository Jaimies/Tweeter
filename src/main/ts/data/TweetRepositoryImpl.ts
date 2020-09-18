import {TweetRepository} from "../domain/repository/TweetRepository"
import {Tweet} from "../domain/model/Tweet"
import {User} from "../domain/model/User"
import {Storage} from "./Storage"

function deserializeTweet(object: any) {
    return new Tweet(object.body, deserializeUser(object.author), new Date(object.date))
}

function deserializeUser(object: any) {
    return new User(object.id, object.name)
}

export class TweetRepositoryImpl implements TweetRepository {
    private readonly tweets: Tweet[]

    constructor(private storage: Storage) {
        this.tweets = this.storage.get("tweets", []).map(deserializeTweet)
    }

    getTweets(): Tweet[] {
        return this.tweets
    }

    postTweet(tweet: Tweet): void {
        this.tweets.unshift(tweet)
        this.persistTweets()
    }

    private persistTweets() {
        this.storage.set("tweets", this.tweets)
    }
}