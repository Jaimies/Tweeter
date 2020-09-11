import {User} from "./User"

export class Tweet {
    constructor(public body: string, public author: User) {
    }
}