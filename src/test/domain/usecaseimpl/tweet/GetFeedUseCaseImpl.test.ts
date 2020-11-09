import {GetFeedUseCaseImpl} from "@/domain/usecaseimpl/tweet/GetFeedUseCaseImpl"
import {MockTweetRepository} from "../MockTweetRepository"
import {StubGetCurrentUserUseCase} from "../StubGetCurrentUserUseCase"
import {User} from "@/domain/model/User"
import {getValue} from "@/shared/RxUtil"

const user = new User("id", "username", "Name", "email@mail.com", "bio", ["id2"])
const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(user)
const useCase = new GetFeedUseCaseImpl(tweetRepository, getCurrentUserUseCase)

it("gets tweets from current user and users they follow", async () => {
    await getValue(useCase.run())
    expect(tweetRepository.getTweetsByUserIds).toBeCalledWith(["id", "id2"])
})
