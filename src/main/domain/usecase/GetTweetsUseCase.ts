import {TweetRepository} from "../repository/TweetRepository"
import {GetCurrentUserUseCase} from "./GetCurrentUserUseCase"
import {Tweet} from "../model/Tweet"
import {Observable} from "rxjs"

export class GetTweetsUseCase {
    constructor(private tweetRepository: TweetRepository, private getUser: GetCurrentUserUseCase) {}

    run(userId: string) : Observable<Tweet[]>{
        const user = this.getUser.run()
        const ids = user?.id == userId ? [userId, ...user.following] : [userId]
        return this.tweetRepository.getTweetsByUserIds(ids)
    }
}
