import {UserRepositoryImpl} from "@/data/UserRepositoryImpl"
import {createTestUser} from "../testData"
import {deleteAllDocs, getAdminFirestore, getTestFirestore} from "./FirestoreTestUtils"
import {ListChange} from "@/domain/model/ListChange"
import {User} from "@/domain/model/User"

jest.mock('@/data/Firebase', () => ({
    // @ts-expect-error
    ...jest.requireActual('@/data/Firebase'),
    FieldValue: require("@firebase/rules-unit-testing").firestore.FieldValue,
}));

const user = createTestUser()

const db = getTestFirestore("userId")
const adminDb = getAdminFirestore()
const adminUsersCollection = adminDb.collection("users")
const userRepository = new UserRepositoryImpl(db)

afterEach(() => deleteAllDocs(adminUsersCollection))
afterAll(() => db.terminate())

it("addUser()", async () => {
    await userRepository.addUser("userId", user)
    expect(await userRepository.getUsers()).toEqual([withAnyId(user)])
})

describe("findUserBy*()", () => {
    it("returns the needed user", async () => {
        await userRepository.addUser("userId", user)
        expect(await userRepository.findUserById("userId")).toEqual(withAnyId(user))
        expect(await userRepository.findUserByUsername(user.username)).toEqual(withAnyId(user))
        expect(await userRepository.findUserByEmail(user.email)).toEqual(withAnyId(user))
    })

    it("returns undefined if user is not found", async () => {
        expect(await userRepository.findUserById(user.id)).toBe(undefined)
        expect(await userRepository.findUserByUsername(user.username)).toBe(undefined)
        expect(await userRepository.findUserByEmail(user.email)).toBe(undefined)
    })
})

describe("updateUser()", () => {
    it("updates name", async () => {
        await userRepository.addUser("userId", user)
        await userRepository.updateUser("userId", {name: "New name"})
        const updatedUser = await userRepository.findUserByUsername(user.username)
        expect(updatedUser!.name).toBe("New name")
    })

    it("adds item to following", async () => {
        await userRepository.addUser("userId", user)
        await userRepository.updateUser("userId", {following: new ListChange.Add("otherid")})
        const updatedUser = await userRepository.findUserByUsername(user.username)
        expect(updatedUser!.following).toEqual(["otherid"])
    })

    it("throws if user is not found", () => {
        expect(userRepository.updateUser("otherId", {})).rejects.toThrow()
    })
})

function withAnyId(user: User): object {
    return {...user, id: expect.any(String)}
}
