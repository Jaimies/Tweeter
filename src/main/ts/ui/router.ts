import Vue from "vue"
import Router from "vue-router"
import Home from "./component/Home"
import Welcome from "./component/Welcome"
import Login from "./component/Login"
import SignUp from "./component/SignUp"

Vue.use(Router)

export default new Router({
    routes: [
        {path: "/", component: Welcome},
        {path: "/login", component: Login},
        {path: "/home", component: Home},
        {path: "/signup", component: SignUp}
    ]
})