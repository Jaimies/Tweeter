export function removeItem<T>(array: T[], item: T) {
    array.splice(array.indexOf(item), 1)
}

export function unconcat<T>(array: T[], item: T): T[] {
    const clonedArray = [...array]
    removeItem(clonedArray, item)
    return clonedArray
}
