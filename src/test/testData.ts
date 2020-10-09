import {User} from "@/domain/model/User"
import {Tweet} from "@/domain/model/Tweet"
import {UserEntry} from "@/data/UserEntry"

export const testUser = createTestUser()
export const testTweet = createTestTweet(testUser)
export const testUserEntry = createTestUserEntry()

export function createTestUser(): User {
    const id = generateRandomId()
    return new User(id, "Test User", `${id}@gmail.com`, "User's bio", [])
}

export function createTestTweet(author: User): Tweet {
    return new Tweet(`Tweet body ${generateRandomId()}`, author, new Date())
}

export function createTestUserEntry(): UserEntry {
    const id = generateRandomId()
    return new UserEntry(id, `${id}@gmail.com`, "Test User")
}

function generateRandomId(): string {
    return Math.random().toString()
}
