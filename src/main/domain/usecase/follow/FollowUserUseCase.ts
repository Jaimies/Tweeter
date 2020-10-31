export interface FollowUserUseCase {
    run(userId: string): Promise<void>
}
