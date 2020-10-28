export function clone<T>(object: T, changes: object = {}): T {
    const prototype = Object.getPrototypeOf(object)
    return Object.assign(Object.create(prototype), object, changes)
}

export function toPlainObject<T>(object: T): T {
    return Object.keys(object).reduce((newObject, key) => {
        // @ts-ignore
        const property = object[key]
        // @ts-ignore
        newObject[key] = isObject(property) ? toPlainObject(property) : property

        return newObject
    }, {}) as T
}

function isObject(object: object): boolean {
    return typeof object == "object" && !Array.isArray(object) && !(object instanceof Date)
}
