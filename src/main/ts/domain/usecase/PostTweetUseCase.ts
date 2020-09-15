import {TweetRepository} from "../repository/TweetRepository"
import {Tweet} from "../model/Tweet"
import {AuthRepository} from "../repository/AuthRepository"

export class PostTweetUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private authRepository: AuthRepository
    ) {}

    run(text: string) {
        const tweet = new Tweet(
            text,
            this.authRepository.user!,
            new Date()
        )

        this.tweetRepository.postTweet(tweet)
    }
}