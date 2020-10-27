import {AuthRepository, LoginResult, SignUpResult} from "@/domain/repository/AuthRepository"
import {FirebaseAuth} from "@/data/Firebase";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private auth: FirebaseAuth) {
    }

    get userId(): string | undefined {
        return this.auth.currentUser?.uid
    }

    async login(email: string, password: string): Promise<LoginResult> {
        try {
            await this.auth.signInWithEmailAndPassword(email, password)
        } catch (e) {
            if (e.code == "auth/user-not-found")
                return LoginResult.UserNotFound

            if (e.code == "auth/wrong-password")
                return LoginResult.WrongPassword

            throw e
        }

        return LoginResult.Success
    }

    async signUp(email: string, password: string): Promise<SignUpResult> {
        try {
            await this.auth.createUserWithEmailAndPassword(email, password)

        } catch (e) {
            if (e.code == "auth/email-already-in-use")
                return SignUpResult.EmailTaken

            throw e
        }

        return SignUpResult.Success
    }

    logout(): Promise<void> {
        return this.auth.signOut()
    }
}
