export interface UserInterface {
    _id: string
    name: string,
    userName: string,
    email: string,
    image: string,
    address?: [Address],
    password: string,
    confirmPassword: string,
}
export interface UserRegistrationInterface {
    name: string,
    userName: string,
    email: string,
    image: string,
    address?: [Address],
    password: string,
    confirmPassword: string,
}
export interface UserLoginInterface {
    userName: string,
    password: string,
}

export interface Address {
    state: string,
    city: string,
    street: string,
    pinCode: number
}