import {StorageImpl} from "@/data/StorageImpl"

const storage = new StorageImpl()

export function provideStorage() {
    return storage
}
