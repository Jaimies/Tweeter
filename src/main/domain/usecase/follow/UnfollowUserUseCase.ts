export interface UnfollowUserUseCase {
    run(userId: string): Promise<void>
}
