import {TweetRepository} from "../../repository/TweetRepository"
import {Tweet} from "../../model/Tweet"
import {Observable} from "rxjs"
import {checkIsDefined} from "@/shared/Preconditions"
import {GetFeedUseCase} from "@/domain/usecase/tweet/GetFeedUseCase"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"

const AUTH_REQUIRED = "Authentication is required to get feed."

export class GetFeedUseCaseImpl implements GetFeedUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private getUser: GetCurrentUserUseCase
    ) {}

    async run(): Promise<Observable<Tweet[]>> {
        const user = checkIsDefined(await this.getUser.run(), AUTH_REQUIRED)
        return this.tweetRepository.getTweetsByUserIds([user.id, ...user.following])
    }
}
