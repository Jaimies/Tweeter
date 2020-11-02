import {User} from "@/domain/model/User"
import {generateHash} from "./generateHash"

export const testUser = createTestUser()

export function createTestUser(): User {
    const id = generateHash()
    return new User(id, "username", "Test User", `${id}@gmail.com`, "User's bio", [])
}
