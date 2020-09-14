import {UiUser, mapUserToPresentation} from "./UiUser"
import {Tweet} from "../../domain/model/Tweet"

export class UiTweet {
    constructor(public body: string, public author: UiUser) {
    }
}

export function mapTweetToPresentation({body, author}: Tweet) {
    return new UiTweet(body, mapUserToPresentation(author))
}