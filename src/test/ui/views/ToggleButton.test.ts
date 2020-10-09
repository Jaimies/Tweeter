/** @jest-environment jsdom */

import ToggleButton from "@/ui/views/ToggleButton.vue"
import {mount, Wrapper} from "@vue/test-utils"
import {Vue} from "vue/types/vue"

function mountComponent(enabled: boolean): Wrapper<Vue> {
    return mount(ToggleButton, {
        propsData: {enabled},
        slots: {
            enabledText: "Enabled",
            disabledText: "Disabled"
        }
    })
}

it("show enabled text if enabled", () => {
    const wrapper = mountComponent(true)
    expect(wrapper.text()).toEqual("Enabled")
})

it("shows disabled text if disabled", () => {
    const wrapper = mountComponent(false)
    expect(wrapper.text()).toEqual("Disabled")
})

it("emits toggle event when clicked", () => {
    const wrapper = mountComponent(true)
    wrapper.trigger("click")
    expect(wrapper.emitted()).toHaveProperty("toggle")
})
