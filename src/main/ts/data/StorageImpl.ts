import {Storage} from "./Storage"

export class StorageImpl implements Storage {
    get<T>(key: string, defaultValue: T): T {
        const valueString = localStorage.getItem(key)
        if (!valueString) return defaultValue
        return JSON.parse(valueString) as T
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}