import {User} from "@/domain/model/User"
import {Tweet} from "@/domain/model/Tweet"
import {generateHash} from "@/shared/generateHash"

export const testUser = createTestUser()
export const testTweet = createTestTweet(testUser)

export function createTestUser(): User {
    const id = generateHash()
    return new User(id, "Test User", `${id}@gmail.com`, "User's bio", [])
}

export function createTestTweet(author: User, date: Date = new Date("2018-01-01")): Tweet {
    return new Tweet(generateHash(), `Tweet body ${generateHash()}`, author, date)
}
