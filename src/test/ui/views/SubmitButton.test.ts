/** @jest-environment jsdom */

import SubmitButton from "@/ui/components/ui/SubmitButton.vue"
import {mount, shallowMount, Wrapper} from "@vue/test-utils"
import Vue from "vue"
import Vuetify from "vuetify"

Vue.use(Vuetify)

function mountComponent(isValid: Boolean, isLoading: Boolean) : Wrapper<Vue> {
    return shallowMount(SubmitButton, {
        propsData: {isValid, isLoading}
    })
}

it("is not disabled if the component is valid but not loading", () => {
    const wrapper = mountComponent(true, false)
    const button = wrapper.get("v-btn-stub")
    expect(button.attributes()["disabled"]).toBeFalsy()
})

it("is disabled if the component is not valid", () => {
    const wrapper = mountComponent(false, false)
    const button = wrapper.get("v-btn-stub")
    expect(button.attributes()["disabled"]).toBe("true")
})

it("is disabled if the component is loading", () => {
    const wrapper = mountComponent(true, true)
    const button = wrapper.get("v-btn-stub")
    expect(button.attributes()["disabled"]).toBe("true")
})
