import {UiUser, mapUserToPresentation} from "./UiUser"
import {Tweet} from "../../domain/model/Tweet"
import {getTimeLabel} from "../util/getTimeLabel"

export class UiTweet {
    constructor(
        public body: string,
        public author: UiUser,
        public displayDate: string,
        public isoDate: string
    ) {
    }
}

export function mapTweetToPresentation({body, author, date}: Tweet) {
    return new UiTweet(
        body,
        mapUserToPresentation(author),
        getTimeLabel(date),
        date.toISOString()
    )
}