import {TweetRepositoryImpl} from "../data/TweetRepositoryImpl"
import {TweetRepository} from "../domain/repository/TweetRepository"

const tweetRepository = new TweetRepositoryImpl()

export function provideTweetRepository(): TweetRepository {
    return tweetRepository
}