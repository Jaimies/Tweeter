import {unconcat} from "@/shared/ArrayUtil"

export abstract class ListChange<T> {
    constructor(private value: T) {}

    abstract apply(arr: T[]): T[]

    static Add = class<T> extends ListChange<T> {
        apply(arr: T[]) {
            return arr.concat(this.value)
        }
    }
    static Remove = class<T> extends ListChange<T> {
        apply(arr: T[]) {
            return unconcat(arr, this.value)
        }
    }
}
