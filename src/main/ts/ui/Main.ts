// @ts-expect-error
import Vue, {CreateElement} from "vue"
// @ts-expect-error
import App from "./component/App"
import {provideGetTweetsUseCase} from "../di/provideGetTweetsUseCase"
import {providePostTweetUseCase} from "../di/providePostTweetUseCase"
import {provideGetUserUseCase} from "../di/provideGetUserUseCase"
import {provideLoginUseCase} from "../di/provideLoginUseCase"
import router from "./router"

const getTweetsUseCase = provideGetTweetsUseCase()
const postTweetUseCase = providePostTweetUseCase()
const getUserUseCase = provideGetUserUseCase()
const loginUseCase = provideLoginUseCase()

new Vue({
    router,
    render: (h: CreateElement) => h(App),
    provide: {
        getUser: () => getUserUseCase.run(),
        performLogin: (credential: string, password: string) => loginUseCase.run(credential, password),
        getTweets: () => Vue.observable({tweets: getTweetsUseCase.run()}),
        postTweet: (text: string) => postTweetUseCase.run(text)
    }
}).$mount("#app")