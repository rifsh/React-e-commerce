export interface userInterface {
    name: string,
    usrname: string,
    password: string,
    confirmPassword: string,
    email: string,
    image: string,
    isDeleted: boolean,
    cretedOn: Date,
    address: [Address]
    comparePassword(candidatePwsrd: string, dbPswrd: string): Promise<boolean>;
}

interface Address {
    state: string,
    city: string,
    street: string,
    pinCode: number
}