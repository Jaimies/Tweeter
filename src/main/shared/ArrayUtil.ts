export function removeItem<T>(array: T[], item: T) {
    array.splice(array.indexOf(item), 1)
}

export function unconcat<T>(array: T[], item: T): T[] {
    const clonedArray = [...array]
    removeItem(clonedArray, item)
    return clonedArray
}

export function split<T>(array: T[], chunkSize: number) {
    return array.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize)

        if (!result[chunkIndex]) {
            result[chunkIndex] = []
        }

        result[chunkIndex].push(item)

        return result
    }, [] as T[][])
}
