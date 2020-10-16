export function clone<T>(object: T, changes: object = {}): T {
    const prototype = Object.getPrototypeOf(object)
    return Object.assign(Object.create(prototype), object, changes)
}
