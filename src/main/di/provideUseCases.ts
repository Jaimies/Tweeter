import {GetCurrentUserUseCaseImpl} from "@/domain/usecaseimpl/user/GetCurrentUserUseCaseImpl"
import {GetFeedUseCaseImpl} from "@/domain/usecaseimpl/tweet/GetFeedUseCaseImpl"
import {LoginUseCaseImpl} from "@/domain/usecaseimpl/auth/LoginUseCaseImpl"
import {PostTweetUseCaseImpl} from "@/domain/usecaseimpl/tweet/PostTweetUseCaseImpl"
import {SignUpUseCaseImpl} from "@/domain/usecaseimpl/auth/SignUpUseCaseImpl"
import {provideAuthRepository, provideTweetRepository, provideUserRepository} from "./provideRepositories"
import {GetUsersUseCaseImpl} from "@/domain/usecaseimpl/user/GetUsersUseCaseImpl"
import {FindUserUseCaseImpl} from "@/domain/usecaseimpl/user/FindUserUseCaseImpl"
import {UpdateProfileUseCaseImpl} from "@/domain/usecaseimpl/user/UpdateProfileUseCaseImpl"
import {LogoutUseCaseImpl} from "@/domain/usecaseimpl/auth/LogoutUseCaseImpl"
import {FollowUserUseCaseImpl} from "@/domain/usecaseimpl/follow/FollowUserUseCaseImpl"
import {UnfollowUserUseCaseImpl} from "@/domain/usecaseimpl/follow/UnfollowUserUseCaseImpl"
import {GetTweetsByUserUseCaseImpl} from "@/domain/usecaseimpl/tweet/GetTweetsByUserUseCaseImpl"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"
import {LoginUseCase} from "@/domain/usecase/auth/LoginUseCase"
import {PostTweetUseCase} from "@/domain/usecase/tweet/PostTweetUseCase"
import {SignUpUseCase} from "@/domain/usecase/auth/SignUpUseCase"
import {GetUsersUseCase} from "@/domain/usecase/user/GetUsersUseCase"
import {FindUserUseCase} from "@/domain/usecase/user/FindUserUseCase"
import {UpdateProfileUseCase} from "@/domain/usecase/user/UpdateProfileUseCase"
import {LogoutUseCase} from "@/domain/usecase/auth/LogoutUseCase"
import {FollowUserUseCase} from "@/domain/usecase/follow/FollowUserUseCase"
import {UnfollowUserUseCase} from "@/domain/usecase/follow/UnfollowUserUseCase"
import {GetAuthStateUseCase} from "@/domain/usecase/auth/GetAuthStateUseCase"
import {GetAuthStateUseCaseImpl} from "@/domain/usecaseimpl/auth/GetAuthStateUseCaseImpl"
import {SendPasswordResetEmailUseCase} from "@/domain/usecase/auth/SendPasswordResetEmailUseCase"
import {SendPasswordResetEmailUseCaseImpl} from "@/domain/usecaseimpl/auth/SendPasswordResetEmailUseCaseImpl"
import {LikeTweetUseCase} from "@/domain/usecase/tweet/LikeTweetUseCase"
import {LikeTweetUseCaseImpl} from "@/domain/usecaseimpl/tweet/LikeTweetUseCaseImpl"
import {GetFollowersUseCaseImpl} from "@/domain/usecaseimpl/follow/GetFollowersUseCaseImpl"
import {GetFollowersUseCase} from "@/domain/usecase/follow/GetFollowersUseCase"

export function provideGetCurrentUserUseCase(): GetCurrentUserUseCase {
    return new GetCurrentUserUseCaseImpl(provideAuthRepository(), provideUserRepository())
}

export function provideGetFeedUseCase(): GetFeedUseCaseImpl {
    return new GetFeedUseCaseImpl(provideTweetRepository(), provideGetCurrentUserUseCase())
}

export function provideGetTweetsByUserUseCase(): GetTweetsByUserUseCaseImpl {
    return new GetTweetsByUserUseCaseImpl(provideTweetRepository(), provideUserRepository())
}

export function provideLoginUseCase(): LoginUseCase {
    return new LoginUseCaseImpl(provideAuthRepository())
}

export function provideSendPasswordResetEmailUseCase(): SendPasswordResetEmailUseCase {
    return new SendPasswordResetEmailUseCaseImpl(provideAuthRepository())
}

export function providePostTweetUseCase(): PostTweetUseCase {
    return new PostTweetUseCaseImpl(provideTweetRepository(), provideGetCurrentUserUseCase())
}

export function provideLikeTweetUseCase(): LikeTweetUseCase {
    return new LikeTweetUseCaseImpl(provideTweetRepository(), provideAuthRepository())
}

export function provideSignUpUseCase(): SignUpUseCase {
    return new SignUpUseCaseImpl(provideAuthRepository(), provideUserRepository())
}

export function provideGetUsersUseCase(): GetUsersUseCase {
    return new GetUsersUseCaseImpl(provideUserRepository(), provideAuthRepository())
}

export function provideFindUserUseCase(): FindUserUseCase {
    return new FindUserUseCaseImpl(provideUserRepository())
}

export function provideUpdateProfileUseCase(): UpdateProfileUseCase {
    return new UpdateProfileUseCaseImpl(provideUserRepository(), provideAuthRepository())
}

export function provideLogoutUseCase(): LogoutUseCase {
    return new LogoutUseCaseImpl(provideAuthRepository())
}

export function provideFollowUserUseCase(): FollowUserUseCase {
    return new FollowUserUseCaseImpl(provideUserRepository(), provideAuthRepository())
}

export function provideUnfollowUserUseCase(): UnfollowUserUseCase {
    return new UnfollowUserUseCaseImpl(provideUserRepository(), provideAuthRepository())
}

export function provideGetAuthStateUseCase(): GetAuthStateUseCase {
    return new GetAuthStateUseCaseImpl(provideAuthRepository())
}

export function provideGetFollowersUseCase(): GetFollowersUseCase {
    return new GetFollowersUseCaseImpl(provideUserRepository())
}
