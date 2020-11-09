import {TweetRepository} from "../../repository/TweetRepository"
import {Tweet} from "../../model/Tweet"
import {Observable} from "rxjs"
import {checkIsDefined} from "@/shared/Preconditions"
import {GetFeedUseCase} from "@/domain/usecase/tweet/GetFeedUseCase"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {switchMap} from "rxjs/operators"
import {User} from "@/domain/model/User"

const AUTH_REQUIRED = "Authentication is required to get feed."

export class GetFeedUseCaseImpl implements GetFeedUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private getUser: GetCurrentUserUseCase,
    ) {}

    run(): Observable<Tweet[]> {
        return this.getUser.run().pipe(
            switchMap(user => this.getTweetsForUser(user)),
        )
    }

    private getTweetsForUser(user: User | undefined) {
        checkIsDefined(user, AUTH_REQUIRED)
        return this.tweetRepository.getTweetsByUserIds([user!.id, ...user!.following])
    }
}
