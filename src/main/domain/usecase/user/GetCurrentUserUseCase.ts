import {User} from "@/domain/model/User"
import {Observable} from "rxjs"

export interface GetCurrentUserUseCase {
    run(): Observable<User | undefined>
}
