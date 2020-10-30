export interface ProfileUpdate {
    name: string
    bio: string
}

export interface UpdateProfileUseCase {
    run(update: ProfileUpdate): Promise<void>
}
