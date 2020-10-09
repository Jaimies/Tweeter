import {User} from "@/domain/model/User"

export class UiUser {
    constructor(
        public name: string,
        public id: string,
        public bio: string
    ) {}
}

export function mapUserToPresentation({id, name, bio}: User) {
    return new UiUser(name, id, bio)
}
