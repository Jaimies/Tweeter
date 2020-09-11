import {Tweet} from "../model/Tweet"

export interface TweetRepository {
    getTweets(): Tweet[]
}