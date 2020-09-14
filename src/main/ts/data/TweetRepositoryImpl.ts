import {TweetRepository} from "../domain/repository/TweetRepository"
import {Tweet} from "../domain/model/Tweet"
import {User} from "../domain/model/User"

export class TweetRepositoryImpl implements TweetRepository {
    getTweets(): Tweet[] {
        const fakeUser = new User("fakeuser", "Fake User")
        const fakeTweet = new Tweet("Fake tweet", fakeUser)
        return [fakeTweet]
    }
}