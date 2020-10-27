import {FirebaseAuth} from "@/data/Firebase";

export class StubSignUpFirebaseAuth implements FirebaseAuth {
    constructor(private errorCode: string | null) {}

    // @ts-ignore
    async createUserWithEmailAndPassword(email: string, password: string) {
        if (this.errorCode != null)
            throwError(this.errorCode)

        return undefined;
    }
}

export class StubSignInFirebaseAuth implements FirebaseAuth {
    constructor(private errorCode: string | null) {}

    // @ts-ignore
    async signInWithEmailAndPassword(email: string, password: string) {
        if (this.errorCode != null)
            throwError(this.errorCode)

        return undefined;
    }
}

function throwError(code: string) {
    throw {code, message: ""}
}