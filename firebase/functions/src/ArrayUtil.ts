export function equals<T>(array: T[], otherArray: T[]) {
    return array.length == otherArray.length && array.every(item => otherArray.includes(item))
}

export function diff<T>(array: T[], otherArray: T[]) {
    return array.filter(item => !otherArray.includes(item))
}
