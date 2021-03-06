import Vue, {CreateElement} from "vue"
import Vuelidate from "vuelidate"
import VueRx from "vue-rx"
import App from "./App.vue"
import AsyncComputed from "vue-async-computed"
import emitBubbling from "./emitBubbling"
import router from "./router"
import store from "./store"
import {vuetify} from "@/ui/vuetify"

Vue.use(Vuelidate)
Vue.use(VueRx)
Vue.use(emitBubbling)
Vue.use(AsyncComputed)

export const vue = new Vue({
    vuetify,
    router,
    store,
    render: (h: CreateElement) => h(App),
}).$mount("#app")
