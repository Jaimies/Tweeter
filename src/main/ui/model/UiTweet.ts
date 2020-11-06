import {Tweet} from "@/domain/model/Tweet"
import {getTimeLabel} from "../util/getTimeLabel"
import {UiTweetAuthor} from "@/ui/model/UiTweetAuthor"

export class UiTweet {
    constructor(
        public id: string,
        public body: string,
        public author: UiTweetAuthor,
        public displayDate: string,
        public isoDate: string,
    ) {}
}

export function mapTweetToPresentation({id, body, author, date}: Tweet) {
    return new UiTweet(
        id,
        body,
        UiTweetAuthor.from(author),
        getTimeLabel(date),
        date.toISOString(),
    )
}
