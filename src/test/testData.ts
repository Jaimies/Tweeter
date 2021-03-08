import {User} from "@/domain/model/User"
import {generateHash} from "./generateHash"

export const testUser = createTestUser()

export function createTestUser(id = generateHash(), following: string[] = [], followers: string[] = []): User {
    return new User(id, id, "Test User", `${id}@gmail.com`, "User's bio", following, followers)
}
