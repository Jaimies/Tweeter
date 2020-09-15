import {TweetRepository} from "../domain/repository/TweetRepository"
import {Tweet} from "../domain/model/Tweet"

export class TweetRepositoryImpl implements TweetRepository {
    private tweets: Tweet[] = []

    getTweets(): Tweet[] {
        return this.tweets
    }

    postTweet(tweet: Tweet): void {
        this.tweets.unshift(tweet)
    }
}