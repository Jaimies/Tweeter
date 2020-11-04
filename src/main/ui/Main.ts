import Vue, {CreateElement} from "vue"
import Vuelidate from "vuelidate"
import VueRx from "vue-rx"
import App from "./App.vue"
import emitBubbling from "./emitBubbling"
import router from "./router"
import store from "./store"

Vue.use(Vuelidate)
Vue.use(VueRx)
Vue.use(emitBubbling)

export const vue = new Vue({
    router,
    store,
    render: (h: CreateElement) => h(App)
}).$mount("#app")
