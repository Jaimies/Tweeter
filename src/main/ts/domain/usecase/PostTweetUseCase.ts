import {TweetRepository} from "../repository/TweetRepository"
import {Tweet} from "../model/Tweet"
import {User} from "../model/User"

export class PostTweetUseCase {
    constructor(private tweetRepository: TweetRepository) {}

    run(text: string) {
        const tweet = new Tweet(
            text,
            new User("fakeuser", "Fake User"),
            new Date()
        )

        this.tweetRepository.postTweet(tweet)
    }
}