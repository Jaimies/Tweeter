import {Tweet} from "@/domain/model/Tweet"
import {User} from "@/domain/model/User"
import {TweetAuthor} from "@/domain/model/TweetAuthor"
import {DbUser} from "@/data/model/DbUser"

export function deserializeTweet(id: string, {author, body, date, likedBy}: any) {
    return new Tweet(id, body, deserializeTweetAuthor(author), date.toDate(), likedBy || [])
}

function deserializeTweetAuthor({id, username, name}: any) {
    return new TweetAuthor(id, username, name)
}

export function deserializeUser(id: string, {username, bio, email, following, followers, name}: DbUser) {
    return new User(id, username, name, email, bio, following, followers)
}
