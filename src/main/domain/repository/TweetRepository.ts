import {Tweet} from "../model/Tweet"
import {Observable} from "rxjs"

export interface TweetRepository {
    getTweets(): Observable<Tweet[]>
    addTweet(tweet: Tweet): void
}
