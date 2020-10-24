 import {IllegalStateException} from "@/shared/IllegalStateException"

export function checkIsDefined<T>(value: T | null | undefined, message: string): T {
    if (value == null)
        throw new IllegalStateException(message)

    return value
}
