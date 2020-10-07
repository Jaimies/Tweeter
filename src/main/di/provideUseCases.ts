import {CheckIfLoggedInUseCase} from "../domain/usecase/CheckIfLoggedInUseCase"
import {GetCurrentUserUseCase} from "../domain/usecase/GetCurrentUserUseCase"
import {GetTweetsUseCase} from "../domain/usecase/GetTweetsUseCase"
import {LoginUseCase} from "../domain/usecase/LoginUseCase"
import {PostTweetUseCase} from "../domain/usecase/PostTweetUseCase"
import {SignUpUseCase} from "../domain/usecase/SignUpUseCase"
import {provideAuthRepository, provideTweetRepository, provideUserRepository} from "./provideRepositories"
import {GetUsersUseCase} from "../domain/usecase/GetUsersUseCase"
import {FindUserByIdUseCase} from "../domain/usecase/FindUserByIdUseCase"
import {UpdateUserUseCase} from "../domain/usecase/UpdateUserUseCase"
import {CheckCredentialAvailabilityUseCase} from "../domain/usecase/CheckCredentialAvailabilityUseCase"
import {CheckCredentialValidityUseCase} from "../domain/usecase/CheckCredentialValidityUseCase"

export function provideCheckIfLoggedInUseCase() {
    return new CheckIfLoggedInUseCase(provideAuthRepository())
}

export function provideGetUserUseCase() {
    return new GetCurrentUserUseCase(provideAuthRepository(), provideUserRepository())
}

export function provideGetTweetsUseCase(): GetTweetsUseCase {
    return new GetTweetsUseCase(provideTweetRepository(), provideGetUserUseCase())
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

export function provideUpdateUserUseCase() {
    return new UpdateUserUseCase(provideUserRepository())
}

export function provideCheckCredentialAvailabilityUseCase() {
    return new CheckCredentialAvailabilityUseCase(provideUserRepository())
}

export function provideCheckCredentialValidityUseCase() {
    return new CheckCredentialValidityUseCase(provideAuthRepository())
}
