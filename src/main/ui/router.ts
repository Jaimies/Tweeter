import Vue from "vue"
import Router, {NavigationGuardNext, Route, RouteRecord} from "vue-router"
import Home from "./components/Home"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import {provideCheckIfLoggedInUseCase} from "../di/provideUseCases"

Vue.use(Router)

const router = new Router({
    routes: [
        {path: "/", component: Welcome},
        {path: "/login", component: Login},
        {path: "/signup", component: SignUp},
        {path: "/home", component: Home, meta: {requiresAuth: true}}
    ]
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    const requiresAuth = to.matched.some((record: RouteRecord) => record.meta.requiresAuth)
    const isAuthenticated = provideCheckIfLoggedInUseCase().run()

    next(getNavigationPath(requiresAuth, isAuthenticated))
})

export function getNavigationPath(requiresAuth: boolean, isAuthenticated: boolean): string | undefined {
    if (requiresAuth && !isAuthenticated)
        return "/"

    if (!requiresAuth && isAuthenticated)
        return "/home"

    return undefined
}

export default router
