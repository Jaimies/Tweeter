import {GetFeedUseCaseImpl} from "@/domain/usecaseimpl/tweet/GetFeedUseCaseImpl"
import {MockTweetRepository} from "./MockTweetRepository"
import {StubGetCurrentUserUseCase} from "./StubGetCurrentUserUseCase"
import {User} from "@/domain/model/User"
import {GetCurrentUserUseCaseImpl} from "@/domain/usecaseimpl/user/GetCurrentUserUseCaseImpl"

const user = new User("id", "Name", "email@mail.com", "bio", ["id2"])
const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(user) as unknown as GetCurrentUserUseCaseImpl
const useCase = new GetFeedUseCaseImpl(tweetRepository, getCurrentUserUseCase)

it("gets tweets from current user and users they follow", () => {
    useCase.run()
    expect(tweetRepository.getTweetsByUserIds).toBeCalledWith(["id", "id2"])
})
