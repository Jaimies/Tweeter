// @ts-expect-error
import Vue, {CreateElement} from "vue"
import Vuelidate from "vuelidate"
// @ts-expect-error
import App from "./App"
import router from "./router"

Vue.use(Vuelidate)

new Vue({
    router,
    render: (h: CreateElement) => h(App)
}).$mount("#app")
