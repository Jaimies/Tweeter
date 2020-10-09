import {Tweet} from "@/domain/model/Tweet"
import {User} from "@/domain/model/User"

export function deserializeTweet({author, body, date}: any) {
    return new Tweet(body, deserializeUser(author), new Date(date))
}

export function deserializeUser({bio, email, following, id, name}: any) {
    return new User(id, name, email, bio, following)
}
