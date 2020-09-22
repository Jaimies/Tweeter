import Vue from "vue"
import Router, {NavigationGuardNext, Route} from "vue-router"
import Home from "./components/Home"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import UserList from "./components/UserList"
import UserProfile from "./components/UserProfile"
import {provideCheckIfLoggedInUseCase} from "../di/provideUseCases"
import {AuthState} from "./model/AuthState"
import Authenticated = AuthState.Authenticated
import Unauthenticated = AuthState.Unauthenticated

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            component: Welcome,
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/login",
            component: Login,
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/signup",
            component: SignUp,
            meta: {requiredAuthState: Unauthenticated}
        },
        {
            path: "/home",
            component: Home,
            meta: {requiredAuthState: Authenticated}
        },
        {
            path: "/users",
            component: UserList
        },
        {
            path: "/:id",
            component: UserProfile,
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
