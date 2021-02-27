export interface LikeTweetUseCase {
    likeTweet(id: string): Promise<void>
    unlikeTweet(id: string): Promise<void>
}
