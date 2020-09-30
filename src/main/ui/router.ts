import Vue from "vue"
import Router, {NavigationGuardNext, Route} from "vue-router"
import {provideCheckIfLoggedInUseCase} from "../di/provideUseCases"
import {AuthState} from "./model/AuthState"
import Authenticated = AuthState.Authenticated
import Unauthenticated = AuthState.Unauthenticated

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            component: () => import("./components/Welcome.vue"),
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/login",
            component: ()=> import("./components/Login.vue"),
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/signup",
            component: () => import("./components/SignUp.vue"),
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/home",
            component: () => import("./components/Home.vue"),
            meta: {requiredAuthState: Authenticated}
        },
        {
            path: "/users",
            component: () => import("./components/UserList.vue")
        },
        {
            path: "/:id",
            component: () => import("./components/UserProfile.vue"),
            props: true
        }
    ]
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    const requiredAuthState = to.meta.requiredAuthState
    const isAuthenticated = provideCheckIfLoggedInUseCase().run()

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
