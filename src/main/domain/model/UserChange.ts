import {ListChange} from "@/domain/model/ListChange"

export interface UserChange {
    name?: string,
    email?: string,
    bio?: string,
    following?: ListChange<string>
}
