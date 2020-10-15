import Vue, {CreateElement} from "vue"
import Vuelidate from "vuelidate"
import VueRx from "vue-rx"
import App from "./App.vue"
import emitBubbling from "./emitBubbling"
import router from "./router"

Vue.use(Vuelidate)
Vue.use(VueRx)
Vue.use(emitBubbling)

new Vue({
    router,
    render: (h: CreateElement) => h(App)
}).$mount("#app")
