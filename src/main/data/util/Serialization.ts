import {Tweet} from "@/domain/model/Tweet"
import {User} from "@/domain/model/User"

export function deserializeTweet({id, author, body, date}: any) {
    return new Tweet(id, body, deserializeUser(author.id, author), date.toDate())
}

export function deserializeUser(id: string, {username, bio, email, following, name}: any) {
    return new User(id, username, name, email, bio, following)
}
