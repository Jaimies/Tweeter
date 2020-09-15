// @ts-expect-error
import Vue, {CreateElement} from "vue"
// @ts-expect-error
import App from "./component/App"
import {provideGetTweetsUseCase} from "../di/provideGetTweetsUseCase"
import {providePostTweetUseCase} from "../di/providePostTweetUseCase"
import {provideGetUserUseCase} from "../di/provideGetUserUseCase"
import {provideSignInUseCase} from "../di/provideSignInUseCase"

const getTweetsUseCase = provideGetTweetsUseCase()
const postTweetUseCase = providePostTweetUseCase()
const getUserUseCase = provideGetUserUseCase()
const signInUseCase = provideSignInUseCase()

new Vue({
    render: (h: CreateElement) => h(App),
    provide: {
        getUser: () => getUserUseCase.run(),
        performSignIn: () => signInUseCase.run(),
        getTweets: () => Vue.observable({tweets: getTweetsUseCase.run()}),
        postTweet: (text: string) => postTweetUseCase.run(text)
    }
}).$mount("#app")