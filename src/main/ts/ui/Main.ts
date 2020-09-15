// @ts-expect-error
import Vue, {CreateElement} from "vue"
// @ts-expect-error
import App from "./component/App"
import {provideGetTweetsUseCase} from "../di/provideGetTweetsUseCase"
import {providePostTweetUseCase} from "../di/providePostTweetUseCase"

const getTweetsUseCase = provideGetTweetsUseCase()
const postTweetUseCase = providePostTweetUseCase()

new Vue({
    render: (h: CreateElement) => h(App),
    provide: {
        getTweets() {
            return Vue.observable({tweets: getTweetsUseCase.run()})
        },

        postTweet(text: string) {
            postTweetUseCase.run(text)
        }
    }
}).$mount("#app")