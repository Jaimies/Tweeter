import {User} from "@/domain/model/User"

export interface GetCurrentUserUseCase {
    run(): Promise<User | undefined>
}
