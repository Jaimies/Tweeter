import {UiUser, mapUserToPresentation} from "./UiUser"
import {Tweet} from "../../domain/model/Tweet"
import {getTimeLabel} from "../util/getTimeLabel"

export class UiTweet {
    constructor(
        public body: string,
        public author: UiUser,
        public date: string
    ) {
    }
}

export function mapTweetToPresentation({body, author, date}: Tweet) {
    return new UiTweet(
        body,
        mapUserToPresentation(author),
        getTimeLabel(date)
    )
}