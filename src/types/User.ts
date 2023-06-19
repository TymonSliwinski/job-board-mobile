export enum UserType {
    DEVELOPER = 'developer',
    COMPANY = 'company',
}

export type User = {
    id: number,
    email: string,
    password: string,
    userType: UserType,
    origin: string,
    createdAt: string,
    updatedAt: string,
};


export type Company = {
    id: number,
    name: string,
    avatar: string,
    location: string,
    userId: number
};

export type Developer = {
    id: number,
    name: string,
    avatar?: string,
    userId: number
};

export type RegisterUser = {
    email: string,
    password: string,
    userType: UserType,
    avatar?: string,
    name?: string,
    location?: string,
    firstName?: string,
    lastName?: string,
};