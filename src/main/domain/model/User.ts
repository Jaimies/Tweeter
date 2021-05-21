export class User {
    constructor(
        public id: string,
        public username: string,
        public name: string,
        public email: string,
        public bio: string = "",
        public following: string[] = [],
        public followers: string[] = [],
    ) {}

    followsUserWithId(id: string) {
        return this.following.includes(id)
    }
}
