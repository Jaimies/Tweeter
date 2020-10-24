import {User} from "@/domain/model/User"

export interface GetUsersUseCase {
    run(userId: string): User[]
}
