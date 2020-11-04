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
            meta: {requiredAuthState: Unauthenticated},
        },
        {
            path: "/login",
            component: () => import(/* webpackPrefetch: true */ "./pages/Login.vue"),
            meta: {requiredAuthState: Unauthenticated},
        },
        {
            path: "/signup",
            component: () => import(/* webpackPrefetch: true */ "./pages/SignUp.vue"),
            meta: {requiredAuthState: Unauthenticated},
        },
        {
            path: "/home",
            component: () => import(/* webpackPrefetch: true */ "./pages/Home.vue"),
            meta: {requiredAuthState: Authenticated},
        },
        {
            path: "/users",
            component: () => import(/* webpackPrefetch: true */ "./pages/Users.vue"),
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
    const requiredAuthState = to.meta.requiredAuthState
    const actualAuthState = await provideGetAuthStateUseCase().run()
    next(getNavigationPath(requiredAuthState, actualAuthState))
})

router.afterEach(() => store.commit("hideLoader"))

function getNavigationPath(requiredAuthState: AuthState, actualAuthState: AuthState): string | undefined {
    if (requiredAuthState == actualAuthState)
        return undefined

    if (requiredAuthState == Authenticated)
        return "/"

    if (requiredAuthState == Unauthenticated)
        return "/home"
}

export default router
