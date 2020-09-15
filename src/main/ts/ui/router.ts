import Vue from "vue"
import Router from "vue-router"
import Home from "./component/Home.vue"
import Welcome from "./component/Welcome.vue"
import Login from "./component/Login.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {path: "/", component: Welcome},
        {path: "/login", component: Login},
        {path: "/home", component: Home}
    ]
})