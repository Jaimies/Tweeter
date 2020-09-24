import {Tweet} from "../model/Tweet"
import {Observable} from "rxjs"

export interface TweetRepository {
    getTweetsByUserId(userId: string): Observable<Tweet[]>
    addTweet(tweet: Tweet): void
}
