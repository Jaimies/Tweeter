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

            if (e.code == "auth/too-many-requests")
                return LoginResult.TooManyAttempts

            throw e
        }

        return LoginResult.Success
    }

    async signUp(email: string, password: string): Promise<SignUpResult> {
        try {
            const credential = await this.auth.createUserWithEmailAndPassword(email, password)
            return new SignUpResult.Success(credential.user!.uid)
        } catch (e) {
            if (e.code == "auth/email-already-in-use")
                return SignUpResult.EmailTaken

            throw e
        }
    }

    logout(): Promise<void> {
        return this.auth.signOut()
    }
}
