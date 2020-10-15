/** @jest-environment jsdom */

import Vue from "vue"
import {mount} from "@vue/test-utils"
import TestComponent from "./TestComponent.vue"
import TestSubComponent from "./TestSubComponent.vue"
import emitBubbling from "@/ui/emitBubbling"

Vue.use(emitBubbling)

it("works", () => {
    const wrapper = mount(TestComponent)
    // @ts-ignore
    wrapper.vm.$children[0].$emitBubbling("testEvent")
    expect(wrapper.findComponent(TestSubComponent).emitted()).toHaveProperty("testEvent")
    expect(wrapper.emitted()).toHaveProperty("testEvent")
})
