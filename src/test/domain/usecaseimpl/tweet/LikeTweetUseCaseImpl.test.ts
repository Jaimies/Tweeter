import {LikeTweetUseCaseImpl} from "@/domain/usecaseimpl/tweet/LikeTweetUseCaseImpl"
import {MockTweetRepository} from "../MockTweetRepository"
import {StubAuthRepository} from "../StubAuthRepository"

const userId = "someUserId"
const tweetId = "someTweetId"

function createUseCase(userId: string | undefined) {
    const tweetRepository = new MockTweetRepository()
    const authRepository = new StubAuthRepository(userId)
    const useCase = new LikeTweetUseCaseImpl(tweetRepository, authRepository)
    return {tweetRepository, useCase}
}

it("likes the tweet if the user is signed in", async () => {
    const {useCase, tweetRepository} = createUseCase(userId)
    await useCase.likeTweet(tweetId)
    expect(tweetRepository.likeTweet).toBeCalledWith(tweetId, userId)
})

it("unlikes the tweet if the user is signed in", async () => {
    const {useCase, tweetRepository} = createUseCase(userId)
    await useCase.unlikeTweet(tweetId)
    expect(tweetRepository.unlikeTweet).toBeCalledWith(tweetId, userId)
})

it("throws an exception if the user is not signed in", async () => {
    const {useCase} = createUseCase(undefined)
    await expect(useCase.likeTweet(tweetId)).rejects.toThrow()
    await expect(useCase.unlikeTweet(tweetId)).rejects.toThrow()
})
