import {GetTweetsByUserUseCaseImpl} from "@/domain/usecaseimpl/tweet/GetTweetsByUserUseCaseImpl"
import {MockTweetRepository} from "../MockTweetRepository"
import {StubUserRepository} from "../StubUserRepository"
import {testUser} from "../../../testData"
import {getValue} from "@/shared/RxUtil"

const tweetRepository = new MockTweetRepository()
const userRepository = new StubUserRepository([testUser])
const useCase = new GetTweetsByUserUseCaseImpl(tweetRepository, userRepository)

it("calls getTweetsByUserIds() with user's id", async () => {
    const tweets$ = await useCase.run(testUser.username)
    await getValue(tweets$)
    expect(tweetRepository.getTweetsByUserIds).toBeCalledWith([testUser.id])
})
