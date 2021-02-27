import {UiTweetMapper} from "@/ui/model/mapper/UiTweetMapper"
import {UiTweetMapperImpl} from "@/ui/model/mapperimpl/UiTweetMapperImpl"
import {provideAuthRepository} from "@/di/provideRepositories"

export function provideUiTweetMapper(): UiTweetMapper {
    return new UiTweetMapperImpl(provideAuthRepository())
}
