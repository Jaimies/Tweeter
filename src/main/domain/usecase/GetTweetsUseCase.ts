import {TweetRepository} from "../repository/TweetRepository"

export class GetTweetsUseCase {
    constructor(private tweetRepository: TweetRepository) {}

    run(userId: string) {
        return this.tweetRepository.getTweetsByUserId(userId)
    }
}
