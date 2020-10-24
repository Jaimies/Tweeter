import {TweetRepository} from "../repository/TweetRepository"
import {Tweet} from "../model/Tweet"
import {GetCurrentUserUseCase} from "./GetCurrentUserUseCase"
import {checkIsDefined} from "@/shared/Preconditions"

const AUTH_REQUIRED = "Authentication is required to post a tweet"

export class PostTweetUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private getUser: GetCurrentUserUseCase
    ) {}

    run(text: string) {
        const currentUser = checkIsDefined(this.getUser.run(), AUTH_REQUIRED)
        const tweet = new Tweet(text, currentUser, new Date())
        this.tweetRepository.addTweet(tweet)
    }
}
