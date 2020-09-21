import {TweetRepository} from "../repository/TweetRepository"
import {Tweet} from "../model/Tweet"
import {GetCurrentUserUseCase} from "./GetCurrentUserUseCase"

export class PostTweetUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private getCurrentUserUseCase: GetCurrentUserUseCase
    ) {}

    run(text: string) {
        const tweet = new Tweet(
            text,
            this.getCurrentUserUseCase.run()!,
            new Date()
        )

        this.tweetRepository.postTweet(tweet)
    }
}
