import {Tweet} from "../model/Tweet"
import {Observable} from "rxjs"

export interface TweetRepository {
    getTweetsByUserIds(userIds: string[]): Observable<Tweet[]>
    addTweet(tweet: Tweet): Promise<void>
    likeTweet(tweetId: string, userId: string): Promise<void>
    unlikeTweet(tweetId: string, userId: string): Promise<void>
}
