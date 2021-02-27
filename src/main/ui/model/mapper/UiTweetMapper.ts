import {Tweet} from "@/domain/model/Tweet"
import {UiTweet} from "@/ui/model/UiTweet"

export interface UiTweetMapper {
    map(tweet: Tweet): Promise<UiTweet>
}
