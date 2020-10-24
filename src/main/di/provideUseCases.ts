import {GetCurrentUserUseCase} from "@/domain/usecase/GetCurrentUserUseCase"
import {GetFeedUseCase} from "@/domain/usecase/GetFeedUseCase"
import {LoginUseCase} from "@/domain/usecase/LoginUseCase"
import {PostTweetUseCase} from "@/domain/usecase/PostTweetUseCase"
import {SignUpUseCase} from "@/domain/usecase/SignUpUseCase"
import {provideAuthRepository, provideTweetRepository, provideUserRepository} from "./provideRepositories"
import {GetUsersUseCase} from "@/domain/usecase/GetUsersUseCase"
import {FindUserByIdUseCase} from "@/domain/usecase/FindUserByIdUseCase"
import {UpdateProfileUseCase} from "@/domain/usecase/UpdateProfileUseCase"
import {LogoutUseCase} from "@/domain/usecase/LogoutUseCase"
import {FollowUserUseCase} from "@/domain/usecase/FollowUserUseCase"
import {UnfollowUserUseCase} from "@/domain/usecase/UnfollowUserUseCase"
import {GetTweetsByUserUseCase} from "@/domain/usecase/GetTweetsByUserUseCase"

export function provideGetUserUseCase() {
    return new GetCurrentUserUseCase(provideAuthRepository(), provideUserRepository())
}

export function provideGetFeedUseCase(): GetFeedUseCase {
    return new GetFeedUseCase(provideTweetRepository(), provideGetUserUseCase())
}

export function provideGetTweetsByUserUseCase() : GetTweetsByUserUseCase{
    return new GetTweetsByUserUseCase(provideTweetRepository())
}

export function provideLoginUseCase() {
    return new LoginUseCase(provideAuthRepository())
}

export function providePostTweetUseCase() {
    return new PostTweetUseCase(provideTweetRepository(), provideGetUserUseCase())
}

export function provideSignUpUseCase() {
    return new SignUpUseCase(provideAuthRepository(), provideUserRepository())
}

export function provideGetUsersUseCase() {
    return new GetUsersUseCase(provideUserRepository())
}

export function provideFindUserByIdUseCase() {
    return new FindUserByIdUseCase(provideUserRepository())
}

export function provideUpdateProfileUseCase() {
    return new UpdateProfileUseCase(provideUserRepository(), provideAuthRepository())
}

export function provideLogoutUseCase() {
    return new LogoutUseCase(provideAuthRepository())
}

export function provideFollowUserUseCase() {
    return new FollowUserUseCase(provideUserRepository(), provideAuthRepository())
}

export function provideUnfollowUserUseCase() {
    return new UnfollowUserUseCase(provideUserRepository(), provideAuthRepository())
}
