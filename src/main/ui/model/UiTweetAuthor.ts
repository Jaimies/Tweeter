import {TweetAuthor} from "@/domain/model/TweetAuthor"

export class UiTweetAuthor {
    constructor(
        public username: string,
        public name: string,
    ) {}

    static from({username, name}: TweetAuthor) {
        return new UiTweetAuthor(username, name)
    }
}
