import {UiTweetMapper} from "@/ui/model/mapper/UiTweetMapper"
import {UiTweetMapperImpl} from "@/ui/model/mapperimpl/UiTweetMapperImpl"

export function provideUiTweetMapper(): UiTweetMapper {
    return new UiTweetMapperImpl()
}
