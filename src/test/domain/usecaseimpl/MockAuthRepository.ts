import {AuthRepository, SignUpResult} from "@/domain/repository/AuthRepository"
import {of} from "rxjs"

export class MockAuthRepository implements AuthRepository {
    constructor(public signUpResult: SignUpResult) {}

    get userId () { return of(undefined) }
    login = jest.fn()
    logout = jest.fn()
    signUp = jest.fn(async () => this.signUpResult)
    sendPasswordResetEmail = jest.fn()
}
