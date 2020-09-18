import {TweetRepositoryImpl} from "../data/TweetRepositoryImpl"
import {TweetRepository} from "../domain/repository/TweetRepository"
import {provideStorage} from "./provideStorage"

const tweetRepository = new TweetRepositoryImpl(provideStorage())

export function provideTweetRepository(): TweetRepository {
    return tweetRepository
}