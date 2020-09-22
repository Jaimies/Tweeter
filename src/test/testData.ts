import {User} from "../main/domain/model/User"
import {Tweet} from "../main/domain/model/Tweet"
import {UserEntry} from "../main/data/UserEntry"

export const testUser = new User("testuser", "Test User", "testuser@gmail.com")
export const testTweet = new Tweet("Tweet body", testUser, new Date())
export const testUserEntry = new UserEntry("testuser", "testuser@gmail.com", "testuser")
