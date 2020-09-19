export class UserEntry {
    constructor(public id: string, public password: string) {}

    static fromPlainObject(object: any) {
        return new UserEntry(object.id, object.password)
    }
}