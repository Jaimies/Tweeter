import {User} from "@/domain/model/User"

export class TweetAuthor {
    constructor(
        public id: string,
        public username: string,
        public name: string,
    ) {}

    static from(user: User) {
        return new TweetAuthor(user.id, user.username, user.name)
    }
}
