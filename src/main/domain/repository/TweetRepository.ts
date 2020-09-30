import {Tweet} from "../model/Tweet"
import {Observable} from "rxjs"

export interface TweetRepository {
    getTweetsByUserIds(userIds: string[]) : Observable<Tweet[]>
    addTweet(tweet: Tweet): void
}
