import {AuthRepository, LoginResult, SignUpResult} from "@/domain/repository/AuthRepository"
import {FirebaseAuth} from "@/data/Firebase"
import {authState} from "rxfire/auth"
import {map} from "rxjs/operators"

export class AuthRepositoryImpl implements AuthRepository {
    userId = authState(this.auth).pipe(
        map(user => user?.uid)
    )

    constructor(private auth: FirebaseAuth) {}

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
