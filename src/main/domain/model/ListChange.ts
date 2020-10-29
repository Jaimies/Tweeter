 export abstract class ListChange<T> {
    constructor(public value: T) {}

    static Add = class<T> extends ListChange<T> {
        constructor(value: T) { super(value) }
    }
    static Remove = class<T> extends ListChange<T> {
        constructor(value: T) { super(value) }
    }
}
