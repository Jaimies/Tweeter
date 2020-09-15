// @ts-expect-error
import Vue, {CreateElement} from "vue"
// @ts-expect-error
import App from "./component/App"
import {provideGetTweetsUseCase} from "../di/ProvideGetTweetsUseCase"
import {mapTweetToPresentation} from "./model/UiTweet"

const getTweetsUseCase = provideGetTweetsUseCase()

new Vue({
    render: (h: CreateElement) => h(App),
    provide: {
        getTweets() {
            return getTweetsUseCase.run().map(tweet => mapTweetToPresentation(tweet))
        }
    }
}).$mount("#app")