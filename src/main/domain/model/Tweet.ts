import {User} from "./User"

export class Tweet {
    constructor(
        public id: string,
        public body: string,
        public author: User,
        public date: Date,
    ) {}
}
