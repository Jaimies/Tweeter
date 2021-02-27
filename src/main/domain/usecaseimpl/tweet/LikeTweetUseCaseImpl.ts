import {LikeTweetUseCase} from "@/domain/usecase/tweet/LikeTweetUseCase"
import {TweetRepository} from "@/domain/repository/TweetRepository"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"
import {checkIsDefined} from "@/shared/Preconditions"

const AUTHENTICATION_REQUIRED = "Authentication is required to like a tweet."

export class LikeTweetUseCaseImpl implements LikeTweetUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private authRepository: AuthRepository,
    ) {}

    async likeTweet(id: string): Promise<void> {
        return this.tweetRepository.likeTweet(id, await this.getUserId())
    }

    async unlikeTweet(id: string): Promise<void> {
        return this.tweetRepository.unlikeTweet(id, await this.getUserId())
    }

    private async getUserId() {
        const userId = await getValue(this.authRepository.userId)
        checkIsDefined(userId, AUTHENTICATION_REQUIRED)
        return userId!
    }
}
