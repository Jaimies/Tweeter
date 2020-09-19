import {User} from "../domain/model/User"

export class UserEntry {
    constructor(public user: User, public password: string) {}
}