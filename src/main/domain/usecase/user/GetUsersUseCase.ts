import {User} from "@/domain/model/User"

export interface GetUsersUseCase {
    run(): Promise<User[]>
}
