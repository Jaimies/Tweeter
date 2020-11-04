import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {from, Observable} from "rxjs"
import {GetTweetsByUserUseCase} from "@/domain/usecase/tweet/GetTweetsByUserUseCase"
import {switchMap} from "rxjs/operators"
import {UserRepository} from "@/domain/repository/UserRepository"
import {User} from "@/domain/model/User"

export class GetTweetsByUserUseCaseImpl implements GetTweetsByUserUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private userRepository: UserRepository,
    ) {}

    run(username: string): Observable<Tweet[]> {
        const user$ = from(this.userRepository.findUserByUsername(username))
        return user$.pipe(
            switchMap(user => this.getTweetsByUser(user)),
        )
    }

    private getTweetsByUser(user: User | undefined) {
        if (!user) return []
        return this.tweetRepository.getTweetsByUserIds([user.id])
    }
}
