import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {GetFeedUseCase} from "@/domain/usecase/tweet/GetFeedUseCase"
import {LoginUseCase} from "@/domain/usecase/auth/LoginUseCase"
import {PostTweetUseCase} from "@/domain/usecase/tweet/PostTweetUseCase"
import {SignUpUseCase} from "@/domain/usecase/auth/SignUpUseCase"
import {provideAuthRepository, provideTweetRepository, provideUserRepository} from "./provideRepositories"
import {GetUsersUseCase} from "@/domain/usecase/user/GetUsersUseCase"
import {FindUserByIdUseCase} from "@/domain/usecase/user/FindUserByIdUseCase"
import {UpdateProfileUseCase} from "@/domain/usecase/user/UpdateProfileUseCase"
import {LogoutUseCase} from "@/domain/usecase/auth/LogoutUseCase"
import {FollowUserUseCase} from "@/domain/usecase/follow/FollowUserUseCase"
import {UnfollowUserUseCase} from "@/domain/usecase/follow/UnfollowUserUseCase"
import {GetTweetsByUserUseCase} from "@/domain/usecase/tweet/GetTweetsByUserUseCase"

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
