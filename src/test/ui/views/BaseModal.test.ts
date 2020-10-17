/** @jest-environment jsdom */

import {mount} from "@vue/test-utils"
import BaseModal from "@/ui/components/ui/Modal.vue"
import Vue from "vue"
import emitBubbling from "@/ui/emitBubbling"

Vue.use(emitBubbling)

it("emits close event only if overlay is clicked", () => {
    const wrapper = mount(BaseModal)
    wrapper.find(".content").trigger("click")
    expect(wrapper.emitted()).not.toHaveProperty("close")
    wrapper.trigger("click")
    expect(wrapper.emitted()).toHaveProperty("close")
})
