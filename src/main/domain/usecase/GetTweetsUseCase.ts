import {TweetRepository} from "../repository/TweetRepository"

export class GetTweetsUseCase {
    constructor(private tweetRepository: TweetRepository) {}

    run() {
        return this.tweetRepository.getTweets()
    }
}