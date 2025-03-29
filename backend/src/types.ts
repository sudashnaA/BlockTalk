import { z } from 'zod';
import { NewUserSchema, LoginUserSchema } from './utils'
import { Board, Post } from '@prisma/client';

export interface User {
    id: number;
    username: string;
    password: string;
}

export type NonSensitiveUser = Omit<User, "password">;
export type passportUser = Pick<User, "id"> | null;
export type NewUser = z.infer<typeof NewUserSchema>; 
export type LoginUser = z.infer<typeof LoginUserSchema>;

export type NewPost = Omit<Post, "id">;
export type NewBoard = Omit<Board, "id">;

export enum Colors {
    red = "Red",
    green = "Green",
    blue = "Blue",
    orange = "Orange",
    yellow = "Yellow",
    purple = "Purple",
    gray = "Gray",
    cyan = "Cyan",
    babyblue = "BabyBlue",
    gold = "Gold",
}

export type JsonWebToken = {
    token: string,
    expires: string,
}