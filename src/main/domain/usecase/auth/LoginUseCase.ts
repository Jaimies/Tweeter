import {LoginResult} from "@/domain/repository/AuthRepository";

export interface LoginUseCase {
    login(email: string, password: string): Promise<LoginResult>
}
