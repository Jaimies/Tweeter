import Vue from "vue"
import Router, {NavigationGuardNext, Route} from "vue-router"
import {provideGetUserUseCase} from "@/di/provideUseCases"
import {AuthState} from "./model/AuthState"
import Authenticated = AuthState.Authenticated
import Unauthenticated = AuthState.Unauthenticated

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            component: () => import("./pages/Welcome.vue"),
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/login",
            component: ()=> import("./pages/Login.vue"),
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/signup",
            component: () => import("./pages/SignUp.vue"),
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/home",
            component: () => import("./pages/Home.vue"),
            meta: {requiredAuthState: Authenticated}
        },
        {
            path: "/users",
            component: () => import("./pages/Users.vue")
        },
        {
            path: "/:id",
            component: () => import("./pages/User.vue"),
            props: true
        }
    ]
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    const requiredAuthState = to.meta.requiredAuthState
    const isAuthenticated = !!provideGetUserUseCase().run()

    next(getNavigationPath(requiredAuthState, isAuthenticated))
})

function getNavigationPath(requiredAuthState: AuthState, isAuthenticated: boolean): string | undefined {
    if (requiredAuthState == Authenticated && !isAuthenticated)
        return "/"
    if (requiredAuthState == Unauthenticated && isAuthenticated)
        return "/home"

    return undefined
}

export default router
