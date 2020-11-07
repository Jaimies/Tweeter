import Vue from "vue"
import Vuex from "vuex"
import {provideGetAuthStateUseCase} from "@/di/provideUseCases"
import {AuthState} from "@/domain/model/AuthState"

Vue.use(Vuex)

const authState = await provideGetAuthStateUseCase().run()

const store = new Vuex.Store({
    state: {
        isLoading: true,
        isAuthenticated: authState == AuthState.Authenticated,
    },
    mutations: {
        hideLoader(state) {
            state.isLoading = false
        },

        showLoader(state) {
            state.isLoading = true
        },
    },
})

export default store
