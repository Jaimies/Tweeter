import {Tweet} from "@/domain/model/Tweet"
import {UiTweetAuthor} from "@/ui/model/UiTweetAuthor"
import {getTimeLabel} from "@/ui/util/getTimeLabel"
import {UiTweet} from "@/ui/model/UiTweet"
import {UiTweetMapper} from "@/ui/model/mapper/UiTweetMapper"

export class UiTweetMapperImpl implements UiTweetMapper {
    async map(tweet: Tweet): Promise<UiTweet> {
        return new UiTweet(
            tweet.id,
            tweet.body,
            UiTweetAuthor.from(tweet.author),
            getTimeLabel(tweet.date),
            tweet.date.toISOString(),
        )
    }
}
