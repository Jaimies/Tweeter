import {Tweet} from "@/domain/model/Tweet"
import {UiTweetAuthor} from "@/ui/model/UiTweetAuthor"
import {getTimeLabel} from "@/ui/util/getTimeLabel"
import {UiTweet} from "@/ui/model/UiTweet"
import {UiTweetMapper} from "@/ui/model/mapper/UiTweetMapper"
import {AuthRepository} from "@/domain/repository/AuthRepository"
import {getValue} from "@/shared/RxUtil"

export class UiTweetMapperImpl implements UiTweetMapper {
    constructor(private authRepository: AuthRepository) {}

    async map(tweet: Tweet): Promise<UiTweet> {
        const userId = await getValue(this.authRepository.userId)

        return new UiTweet(
            tweet.id,
            tweet.body,
            UiTweetAuthor.from(tweet.author),
            getTimeLabel(tweet.date),
            tweet.date.toISOString(),
            tweet.likedBy.includes(userId!)
        )
    }
}
