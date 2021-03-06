/** @jest-environment jsdom */

import ToggleButton from "@/ui/components/ui/ToggleButton.vue"
import {mount, Wrapper} from "@vue/test-utils"
import {Vue} from "vue/types/vue"

function mountComponent(checked: boolean): Wrapper<Vue> {
    return mount(ToggleButton, {
        propsData: {checked},
        slots: {
            enabledText: "Enabled",
            disabledText: "Disabled",
        },
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

it("emits check event if clicked while unchecked", () => {
    const wrapper = mountComponent(false)
    wrapper.trigger("click")
    expect(wrapper.emitted()).toHaveProperty("check")
    expect(wrapper.emitted()).not.toHaveProperty("uncheck")
})

it("emits uncheck event if clicked while checked", () => {
    const wrapper = mountComponent(true)
    wrapper.trigger("click")
    expect((wrapper.emitted())).toHaveProperty("uncheck")
    expect((wrapper.emitted())).not.toHaveProperty("check")
})
