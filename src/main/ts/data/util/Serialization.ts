import {Tweet} from "../../domain/model/Tweet"
import {User} from "../../domain/model/User"
import {UserEntry} from "../UserEntry"

export function deserializeTweet(object: any) {
    return new Tweet(object.body, deserializeUser(object.author), new Date(object.date))
}

export function deserializeUser(object: any) {
    return new User(object.id, object.name, object.email)
}

export function deserializeUserEntry(object: any) {
    return new UserEntry(deserializeUser(object.user), object.password)
}