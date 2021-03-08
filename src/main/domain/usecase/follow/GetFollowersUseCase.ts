import {User} from "@/domain/model/User"

export interface GetFollowersUseCase {
    getFollowersByUsername(username: string): Promise<User[]>
    getFollowingByUsername(username: string): Promise<User[]>
}
