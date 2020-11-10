import Vue from "vue"
import Router, {NavigationGuardNext, Route} from "vue-router"
import {AuthState} from "@/domain/model/AuthState"
import {provideGetAuthStateUseCase} from "@/di/provideUseCases"
import store from "@/ui/store"
import Authenticated = AuthState.Authenticated
import Unauthenticated = AuthState.Unauthenticated

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            component: () => import(/* webpackPrefetch: true */ "./pages/Welcome.vue"),
            meta: {
                requiredAuthState: Unauthenticated,
                title: "Welcome to Tweeter",
            },
        },
        {
            path: "/login",
            component: () => import(/* webpackPrefetch: true */ "./pages/Login/index.vue"),
            meta: {
                requiredAuthState: Unauthenticated,
                title: "Login to Tweeter",
            },
        },
        {
            path: "/signup",
            component: () => import(/* webpackPrefetch: true */ "./pages/SignUp.vue"),
            meta: {
                requiredAuthState: Unauthenticated,
                title: "Sign up to Tweeter",
            },
        },
        {
            path: "/home",
            component: () => import(/* webpackPrefetch: true */ "./pages/Home.vue"),
            meta: {
                requiredAuthState: Authenticated,
                title: "Home / Tweeter",
            },
        },
        {
            path: "/users",
            component: () => import(/* webpackPrefetch: true */ "./pages/Users.vue"),
            meta: {
                title: "Explore users",
            },
        },
        {
            path: "/:username",
            component: () => import(/* webpackPrefetch: true */ "./pages/User.vue"),
            props: true,
        },
    ],
})

router.beforeEach(async (to: Route, from: Route, next: NavigationGuardNext) => {
    store.commit("showLoader")
    const nextPath = await getNavigationPath(to)
    next({path: nextPath, replace: true})
    if(nextPath == from.path) store.commit("hideLoader")
})

router.afterEach(to => {
    store.commit("hideLoader")
    if (to.meta.title) document.title = to.meta.title
})

async function getNavigationPath(to: Route): Promise<string | undefined> {
    const requiredAuthState = to.meta.requiredAuthState
    const actualAuthState = await provideGetAuthStateUseCase().run()
    return getNavigationPathForStates(requiredAuthState, actualAuthState)
}

function getNavigationPathForStates(requiredAuthState: AuthState, actualAuthState: AuthState): string | undefined {
    if (requiredAuthState == actualAuthState)
        return undefined

    if (requiredAuthState == Authenticated)
        return "/"

    if (requiredAuthState == Unauthenticated)
        return "/home"
}

export default router
