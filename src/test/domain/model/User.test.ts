import {User} from "../../../main/domain/model/User"

it("followsUserWithId()", () => {
    const user = new User("id", "name", "email@gmail.com", "bio", ["id1", "id2"])
    expect(user.followsUserWithId("id1")).toBe(true)
    expect(user.followsUserWithId("id2")).toBe(true)
    expect(user.followsUserWithId("id3")).toBe(false)
})
