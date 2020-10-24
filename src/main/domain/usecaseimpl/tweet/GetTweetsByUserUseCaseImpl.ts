import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {Observable} from "rxjs"
import {GetTweetsByUserUseCase} from "@/domain/usecase/tweet/GetTweetsByUserUseCase"

export class GetTweetsByUserUseCaseImpl implements GetTweetsByUserUseCase {
    constructor(private tweetRepository: TweetRepository) {}

    run(userId: string): Observable<Tweet[]> {
        return this.tweetRepository.getTweetsByUserIds([userId])
    }
}
