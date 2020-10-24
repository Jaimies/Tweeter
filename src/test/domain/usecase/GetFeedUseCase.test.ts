import {GetFeedUseCase} from "@/domain/usecase/tweet/GetFeedUseCase"
import {MockTweetRepository} from "./MockTweetRepository"
import {StubGetCurrentUserUseCase} from "./StubGetCurrentUserUseCase"
import {User} from "@/domain/model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/user/GetCurrentUserUseCase"

const user = new User("id", "Name", "email@mail.com", "bio", ["id2"])
const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(user) as unknown as GetCurrentUserUseCase
const useCase = new GetFeedUseCase(tweetRepository, getCurrentUserUseCase)

it("gets tweets from current user and users they follow", () => {
    useCase.run()
    expect(tweetRepository.getTweetsByUserIds).toBeCalledWith(["id", "id2"])
})
