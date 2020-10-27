import {AuthRepositoryImpl} from "@/data/AuthRepositoryImpl"
import {provideStorage} from "./provideStorage"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {TweetRepository} from "@/domain/repository/TweetRepository"
import {UserRepositoryImpl} from "@/data/UserRepositoryImpl"
import {getFirebaseAuth} from "@/data/Firebase";

const auth = getFirebaseAuth()
const authRepository = new AuthRepositoryImpl(auth)

export function provideAuthRepository(): AuthRepository {
    return authRepository
}

const tweetRepository = new TweetRepositoryImpl(provideStorage())

export function provideTweetRepository(): TweetRepository {
    return tweetRepository
}

const userRepository = new UserRepositoryImpl(provideStorage())

export function provideUserRepository() {
    return userRepository
}
