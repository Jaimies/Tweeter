import {TweetRepository} from "../repository/TweetRepository"
import {GetCurrentUserUseCase} from "./GetCurrentUserUseCase"
import {Tweet} from "../model/Tweet"
import {Observable} from "rxjs"
import {checkIsDefined} from "@/shared/Preconditions"

const AUTH_REQUIRED = "Authentication is required to get feed."

export class GetFeedUseCase {
    constructor(
        private tweetRepository: TweetRepository,
        private getUser: GetCurrentUserUseCase
    ) {}

    run(): Observable<Tweet[]> {
        const user = checkIsDefined(this.getUser.run(), AUTH_REQUIRED)
        return this.tweetRepository.getTweetsByUserIds([user.id, ...user.following])
    }
}
