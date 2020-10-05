import {GetTweetsUseCase} from "../../../main/domain/usecase/GetTweetsUseCase"
import {MockTweetRepository} from "./MockTweetRepository"
import {StubGetCurrentUserUseCase} from "./StubGetCurrentUserUseCase"
import {User} from "../../../main/domain/model/User"

const user = new User("id", "Name", "email@mail.com", "bio", ["id2"])
const tweetRepository = new MockTweetRepository()
const getCurrentUserUseCase = new StubGetCurrentUserUseCase(user)
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
