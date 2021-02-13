import {FirebaseAuth} from "@/data/Firebase"

export class StubSignUpFirebaseAuth implements FirebaseAuth {
    constructor(private errorCode: string | null) {}

    // @ts-ignore
    async createUserWithEmailAndPassword() {
        if (this.errorCode != null)
            throwError(this.errorCode)

        return {user: {uid: "uid"}}
    }
}

export class StubSignInFirebaseAuth implements FirebaseAuth {
    constructor(private errorCode: string | null) {}

    // @ts-ignore
    async signInWithEmailAndPassword() {
        if (this.errorCode != null)
            throwError(this.errorCode)

        return undefined
    }
}

// @ts-ignore
export class StubResetPasswordFirebaseAuth implements FirebaseAuth {
    constructor(private errorCode: string | null) {}

    // @ts-ignore
    async sendPasswordResetEmail() {
        if (this.errorCode != null)
            throwError(this.errorCode)

        return undefined
    }
}

function throwError(code: string) {
    throw {code, message: ""}
}
