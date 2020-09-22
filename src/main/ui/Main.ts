// @ts-expect-error
import Vue, {CreateElement} from "vue"
//@ts-expect-error
import Vuelidate from "vuelidate"
import App from "./App.vue"
import router from "./router"

Vue.use(Vuelidate)

new Vue({
    router,
    render: (h: CreateElement) => h(App)
}).$mount("#app")
