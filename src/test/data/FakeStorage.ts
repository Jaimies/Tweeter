import {Storage} from "../../main/data/Storage"

export class FakeStorage implements Storage {
    private values: Map<string, any>

    constructor(initialValues: object = {}) {
        this.values = new Map(Object.entries(initialValues))
    }

    get<T = string>(key: string, defaultValue: T): T {
        return this.values.get(key) || defaultValue
    }

    set(key: string, value: any) {
        this.values.set(key, value)
    }
}
