import {User} from "@/domain/model/User"

export interface FindUserByIdUseCase {
    run(id: string): Promise<User | undefined>
}
