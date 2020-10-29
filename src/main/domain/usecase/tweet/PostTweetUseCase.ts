export interface PostTweetUseCase {
    run(userId: string): Promise<void>
}
