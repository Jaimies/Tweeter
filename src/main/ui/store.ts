import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoading: true,
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
