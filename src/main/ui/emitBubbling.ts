import {PluginFunction} from "vue"

const EmitBubbling: PluginFunction<any> = Vue => {
    Vue.prototype.$emitBubbling = function (event: string, ...args: any[]) {
        let component = this
        while (component.$parent) {
            component.$emit(event, ...args)
            component = component.$parent
        }
    }
}

export default EmitBubbling
