export interface userInterface {
    name: string,
    userName: string,
    password: string,
    confirmPassword: string,
    email: string,
    image: string,
    isDeleted: boolean,
    cretedOn: Date,
    address: [Address]
    comparePassword(candidatePwsrd: string, dbPswrd: string): Promise<boolean>;
}

export interface Address {
    state: string,
    city: string,
    street: string,
    pinCode: number
}