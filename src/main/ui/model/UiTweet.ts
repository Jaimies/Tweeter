import {UiTweetAuthor} from "@/ui/model/UiTweetAuthor"

export class UiTweet {
    constructor(
        public id: string,
        public body: string,
        public author: UiTweetAuthor,
        public displayDate: string,
        public isoDate: string,
        public isLiked: boolean,
    ) {}
}
