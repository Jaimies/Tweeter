import {GetTweetsUseCase} from "@/domain/usecase/GetTweetsUseCase"
import {MockTweetRepository} from "./MockTweetRepository"
import {StubGetCurrentUserUseCase} from "./StubGetCurrentUserUseCase"
import {User} from "@/domain/model/User"
import {GetCurrentUserUseCase} from "@/domain/usecase/GetCurrentUserUseCase"

const user = new User("id", "Name", "email@mail.com", "bio", ["id2"])
const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(user) as unknown as GetCurrentUserUseCase
const useCase = new GetTweetsUseCase(tweetRepository, getCurrentUserUseCase)

afterEach(() => jest.clearAllMocks())

it("gets tweets from user with specified id", () => {
    useCase.run("otherId")
    expect(tweetRepository.getTweetsByUserIds).toBeCalledWith(["otherId"])
})

it("gets tweets from current user and users they follow", () => {
    useCase.run(user.id)
    expect(tweetRepository.getTweetsByUserIds).toBeCalledWith(["id", "id2"])
})
