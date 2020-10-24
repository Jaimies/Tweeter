import {User} from "@/domain/model/User"

export interface FindUserByIdUseCase {
    run(id: string): User | undefined
}
