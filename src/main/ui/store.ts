import Vue from "vue"
import Vuex from "vuex"
import {provideAuthRepository} from "@/di/provideRepositories"
import {getValue} from "@/shared/RxUtil"

Vue.use(Vuex)

const userId =  await getValue(provideAuthRepository().userId)

const store = new Vuex.Store({
    state: {
        isLoading: true,
        userId: userId,
        isAuthenticated: !!userId
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
