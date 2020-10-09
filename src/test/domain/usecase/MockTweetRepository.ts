import {TweetRepository} from "@/domain/repository/TweetRepository"

export class MockTweetRepository implements TweetRepository {
    addTweet = jest.fn()
    getTweetsByUserIds = jest.fn()
}
