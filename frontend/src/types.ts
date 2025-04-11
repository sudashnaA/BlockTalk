export interface User {
    id: number;
    username: string;
    password: string;
}

export type LoginUser = Omit<User, "id">;
export type RegisterUser = LoginUser & {confirmpassword: string};
export type passportUser = Pick<User, "id"> | null;

export type JsonWebToken = {
    token: string,
    expires: string,
};

export interface FormError{
    code: string;
    validation: string;
    message: string;
};

export interface Board {
    id: number;
    name: string;
    description: string;
    logo: string;
    color: string;
};

export interface joinBoardRes {
    status: boolean;
    newMemberCount: number;
}