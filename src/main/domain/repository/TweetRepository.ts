import {Tweet} from "../model/Tweet"

export interface TweetRepository {
    getTweets(): Tweet[]
    addTweet(tweet: Tweet): void
}
