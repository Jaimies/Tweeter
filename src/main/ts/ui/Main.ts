// @ts-expect-error
import Vue, {CreateElement} from "vue"
// @ts-expect-error
import Feed from "./component/Feed.vue"
import {provideGetTweetsUseCase} from "../di/ProvideGetTweetsUseCase"

const getTweetsUseCase = provideGetTweetsUseCase()

new Vue({
    render: (h: CreateElement) => h(Feed),
    provide: {
        getTweets() {
            return getTweetsUseCase.run()
        }
    }
}).$mount("#app")