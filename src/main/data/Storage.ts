export interface Storage {
    get<T = string>(key: string, defaultValue: T): T
    set(key: string, value: any): void
}
