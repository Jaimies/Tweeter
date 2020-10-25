import {TweetRepository} from "../../repository/TweetRepository"
import {Tweet} from "../../model/Tweet"
import {checkIsDefined} from "@/shared/Preconditions"
import {PostTweetUseCase} from "@/domain/usecase/tweet/PostTweetUseCase"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"

const AUTH_REQUIRED = "Authentication is required to post a tweet"

export class PostTweetUseCaseImpl implements PostTweetUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private getUser: GetCurrentUserUseCase
    ) {}

    run(text: string) {
        const currentUser = checkIsDefined(this.getUser.run(), AUTH_REQUIRED)
        const tweet = new Tweet("", text, currentUser, new Date())
        this.tweetRepository.addTweet(tweet)
    }
}
