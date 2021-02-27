import {TweetAuthor} from "@/domain/model/TweetAuthor"

export class Tweet {
    constructor(
        public id: string,
        public body: string,
        public author: TweetAuthor,
        public date: Date,
        public likedBy: string[],
    ) {}
}
