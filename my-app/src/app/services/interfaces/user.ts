export interface IUserLogin {
    email: string,
    password: string,
}

export interface IUserRegister {
    email: string,
    password: string,
    rePassword: string,
    image: string
}

export interface IProfile {
    email: string,
    image: string,
    likedProducts: string[],
    ownProducts: string[],
    money: number,
    _id: string
}