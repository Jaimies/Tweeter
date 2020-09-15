import {User} from "../../domain/model/User"

export class UiUser {
    constructor(public name: string, public id: string) {}
}

export function mapUserToPresentation({id, name}: User) {
    return new UiUser(name, id)
}