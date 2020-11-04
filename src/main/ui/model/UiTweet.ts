import {mapUserToPresentation, UiUser} from "./UiUser"
import {Tweet} from "@/domain/model/Tweet"
import {getTimeLabel} from "../util/getTimeLabel"

export class UiTweet {
    constructor(
        public id: string,
        public body: string,
        public author: UiUser,
        public displayDate: string,
        public isoDate: string,
    ) {}
}

export function mapTweetToPresentation({id, body, author, date}: Tweet) {
    return new UiTweet(
        id,
        body,
        mapUserToPresentation(author),
        getTimeLabel(date),
        date.toISOString(),
    )
}
