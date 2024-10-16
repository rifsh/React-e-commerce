export interface UserRegisrationInterface {
    _id:string
    name: string,
    userName: string,
    email: string,
    image: string,
    password: string,
    confirmPassword: string
}
export interface UserLoginInterface {
    userName: string,
    password: string,
}