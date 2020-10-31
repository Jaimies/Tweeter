import {ListChange} from "@/domain/model/ListChange"
import {UnfollowUserUseCase} from "@/domain/usecase/follow/UnfollowUserUseCase"
import {FollowingUpdater} from "@/domain/usecaseimpl/follow/FollowingUpdater"

const AUTH_REQUIRED = "Authentication is required to unfollow a user."

export class UnfollowUserUseCaseImpl implements UnfollowUserUseCase {
    constructor(private followingUpdater: FollowingUpdater) {}

    run(userId: string) {
        return this.followingUpdater.run(new ListChange.Add(userId), AUTH_REQUIRED)
    }
}
