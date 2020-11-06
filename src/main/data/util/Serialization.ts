import {Tweet} from "@/domain/model/Tweet"
import {User} from "@/domain/model/User"
import {TweetAuthor} from "@/domain/model/TweetAuthor"

export function deserializeTweet({id, author, body, date}: any) {
    return new Tweet(id, body, deserializeTweetAuthor(author), date.toDate())
}

function deserializeTweetAuthor({id, username, name}: any) {
    return new TweetAuthor(id, username, name)
}

export function deserializeUser(id: string, {username, bio, email, following, name}: any) {
    return new User(id, username, name, email, bio, following)
}
