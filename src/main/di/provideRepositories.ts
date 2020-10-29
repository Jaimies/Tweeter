import {AuthRepositoryImpl} from "@/data/AuthRepositoryImpl"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {TweetRepositoryImpl} from "@/data/TweetRepositoryImpl"
import {TweetRepository} from "@/domain/repository/TweetRepository"
import {UserRepositoryImpl} from "@/data/UserRepositoryImpl"
import {getFirebaseAuth, getFirestore} from "@/data/Firebase"

const auth = getFirebaseAuth()
const db = getFirestore()

const authRepository = new AuthRepositoryImpl(auth)

export function provideAuthRepository(): AuthRepository {
    return authRepository
}

const tweetRepository = new TweetRepositoryImpl(db)

export function provideTweetRepository(): TweetRepository {
    return tweetRepository
}

const userRepository = new UserRepositoryImpl(db)

export function provideUserRepository() {
    return userRepository
}
