import {AuthRepositoryImpl} from "@/data/AuthRepositoryImpl"
import {AuthRepository, LoginResult, PasswordResetResult, SignUpResult} from "@/domain/repository/AuthRepository"
import {StubResetPasswordFirebaseAuth, StubSignInFirebaseAuth, StubSignUpFirebaseAuth} from "./StubFirebaseAuth"

describe("login()", () => {
    function createRepository(errorCode: string | null): AuthRepository {
        // @ts-ignore
        return new AuthRepositoryImpl(new StubSignInFirebaseAuth(errorCode))
    }

    it.each([
        [null, LoginResult.Success],
        ["auth/user-not-found", LoginResult.UserNotFound],
        ["auth/wrong-password", LoginResult.WrongPassword],
        ["auth/too-many-requests", LoginResult.TooManyAttempts],
    ])("when error is %o returns %o", async (errorCode, expectedResult) => {
        const repository = createRepository(errorCode)
        const result = await repository.login("email", "password")
        expect(result).toBe(expectedResult)
    })

    it("throws on other errors", async () => {
        const repository = createRepository("auth/account-disabled")
        await expect(repository.login("email", "password")).rejects.toBeDefined()
    })
})

describe("signUp()", () => {
    function createRepository(errorCode: string | null): AuthRepository {
        // @ts-ignore
        return new AuthRepositoryImpl(new StubSignUpFirebaseAuth(errorCode))
    }

    it.each([
        [null, new SignUpResult.Success("uid")],
        ["auth/email-already-in-use", SignUpResult.EmailTaken],
    ])("when error is %o returns %o", async (errorCode, expectedResult) => {
        const repository = createRepository(errorCode)
        const result = await repository.signUp("email", "password")
        expect(result).toEqual(expectedResult)
    })

    it("throws on other errors", async () => {
        const repository = createRepository("auth/account-disabled")
        await expect(repository.signUp("email", "password")).rejects.toBeDefined()
    })
})

describe("sendPasswordResetEmail()", () => {
    function createRepository(errorCode: string | null) {
        // @ts-ignore
        return new AuthRepositoryImpl(new StubResetPasswordFirebaseAuth(errorCode))
    }

    it("returns Success if the reset succeeds", async () => {
        const repository = createRepository(null)
        const result = await repository.sendPasswordResetEmail("some-email")
        expect(result).toBe(PasswordResetResult.Success)
    })

    it("returns InternalError if the error is anything but auth/user-not-found", async () => {
        const repository = createRepository("auth/internal-error")
        const result = await repository.sendPasswordResetEmail("some-email")
        expect(result).toBe(PasswordResetResult.InternalError)
    })

    it("returns Success if the error is auth/user-not-found. (This is done to protect the privacy of the users)", async () => {
        const repository = createRepository("auth/user-not-found")
        const result = await repository.sendPasswordResetEmail("some-email")
        expect(result).toBe(PasswordResetResult.Success)
    })
})
