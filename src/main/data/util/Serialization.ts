import {Tweet} from "@/domain/model/Tweet"
import {User} from "@/domain/model/User"

export function deserializeTweet({id, author, body, date}: any) {
    return new Tweet(id, body, deserializeUser(author), date.toDate())
}

export function deserializeUser({bio, email, following, id, name}: any) {
    return new User(id, name, email, bio, following)
}
