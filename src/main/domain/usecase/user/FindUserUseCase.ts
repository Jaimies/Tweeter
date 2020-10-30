import {User} from "@/domain/model/User"

export interface FindUserUseCase {
    run(id: string): Promise<User | undefined>
}
