import {User} from "@/domain/model/User"

export interface DbUser {
    username: string
    email: string
    name: string
    bio: string
    following: string[]
}

export function mapUserToDb(user: User): DbUser {
    return {
        username: user.username,
        email: user.email,
        name: user.name,
        bio: user.bio,
        following: [],
    }
}
