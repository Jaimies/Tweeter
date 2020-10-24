import {TweetRepository} from "@/domain/repository/TweetRepository"
import {Tweet} from "@/domain/model/Tweet"
import {Observable} from "rxjs"

export class GetTweetsByUserUseCase {
    constructor(private tweetRepository: TweetRepository) {}

    run(userId: string): Observable<Tweet[]> {
        return this.tweetRepository.getTweetsByUserIds([userId])
    }
}
