// @ts-expect-error
import Vue, {CreateElement} from "vue"
// @ts-expect-error
import App from "./component/App"
import router from "./router"

new Vue({
    router,
    render: (h: CreateElement) => h(App)
}).$mount("#app")