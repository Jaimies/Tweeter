import {AuthRepositoryImpl} from "@/data/AuthRepositoryImpl"
import {AuthRepository, LoginResult, SignUpResult} from "@/domain/repository/AuthRepository"
import {StubSignInFirebaseAuth, StubSignUpFirebaseAuth} from "./StubFirebaseAuth"

describe("login()", () => {
    function createRepository(errorCode: string | null): AuthRepository {
        // @ts-ignore
        return new AuthRepositoryImpl(new StubSignInFirebaseAuth(errorCode))
    }

    it.each([
        [null, LoginResult.Success],
        ["auth/user-not-found", LoginResult.UserNotFound],
        ["auth/wrong-password", LoginResult.WrongPassword],
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
