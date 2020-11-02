import {AuthState} from "@/domain/model/AuthState"

export interface GetAuthStateUseCase {
    run(): Promise<AuthState>
}
