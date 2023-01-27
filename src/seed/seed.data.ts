interface userAuth {
    name: string,
    email: string,
    password: string
}
interface user {
    name: string,
    last_name: string,
    addres: string
}
export const userAuthSeed: userAuth[] = [
    {
        email: "example@gmail.com",
        name: "example",
        password: "123456"
    },
    {
        email: "test@gmail.com",
        name: "test",
        password: "123456"
    },
]
export const userSeed: user[] = [
    {
        name: "Peter",
        last_name: "smith",
        addres: "av 51"
    },
    {
        name: "John",
        last_name: "smith",
        addres: "av 54"
    },
]
