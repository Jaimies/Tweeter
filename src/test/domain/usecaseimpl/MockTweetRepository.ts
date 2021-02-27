import {TweetRepository} from "@/domain/repository/TweetRepository"
import {of} from "rxjs"

export class MockTweetRepository implements TweetRepository {
    addTweet = jest.fn(() => Promise.resolve())
    getTweetsByUserIds = jest.fn(() => of([]))
    likeTweet = jest.fn(() => Promise.resolve())
    unlikeTweet = jest.fn(() => Promise.resolve())
}
