/** @jest-environment jsdom */

import LikeButton from "@/ui/components/ui/LikeButton.vue"
import {shallowMount} from "@vue/test-utils"

function mountComponent(isLiked: boolean) {
    return shallowMount(LikeButton, {
        propsData: {isLiked},
    })
}

it("emits the `like` event when liking", async () => {
    const wrapper = mountComponent(false)
    wrapper.find("v-btn").trigger("click")
    expect(wrapper.emitted()).toHaveProperty("like")
})

it("emits the `unlike` event when unliking", async () => {
    const wrapper = mountComponent(true)
    wrapper.find("v-btn").trigger("click")
    expect(wrapper.emitted()).toHaveProperty("unlike")
})
