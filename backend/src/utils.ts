import z from "zod";
import usersService from "./services/usersService";
import boardsService from "./services/boardsService";
import { Response, Request, NextFunction } from 'express';
import { Colors } from "./types";

export const NewUserSchema = z.object({
    username: z.string().nonempty({message: "Username must not be empty"}).refine(async (username: string): Promise<Boolean> => 
        await usersService.checkIfUsernameInUse(username), {message: "Username already exists"}
    ),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),
    confirmpassword: z.string().min(8, {message: "Confirm password must be atleast 8 characters"}),
}).refine( (data) => (data.password === data.confirmpassword), {message: "Passwords do not match"});

export const LoginUserSchema = z.object({
    username: z.string().nonempty({message: "Username must not be empty"}).refine(async (username: string): Promise<Boolean> => 
        !(await usersService.checkIfUsernameInUse(username)), {message: "Username incorrect"}
    ),
    password: z.string().min(8, {message: "Password must be atleast 8 characters"}),
}).refine(async (data): Promise<Boolean> => 
    (await usersService.verifyPassword(data.username, data.password)), {message: "Password incorrect"}
);

export const NewBoardSchema = z.object({
    name: z.string().nonempty({message: "Board Name must not be empty"}).refine(async (name: string): Promise<Boolean> => 
        await boardsService.checkIfBoardExists(name), {message: "Board Name already exists"}
    ),
    description: z.string().nonempty({message: "Description must not be empty"}),
    logo: z.string().nonempty({message: "Logo url must not be empty"}),
    color: z.nativeEnum(Colors),
});

export const GetBoardSchema = z.object({
    name: z.string().nonempty({message: "Board Name must not be empty"}).refine(async (name: string): Promise<Boolean> => 
        !(await boardsService.checkIfBoardExists(name)), {message: "Board does not exist"}
    ),
});

export const IDSchema = z.object({
    id: z.number()
});

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
};

export const ParserMiddleWare = (schema: z.ZodTypeAny) => {
    return async (req: Request, _res: Response, next: NextFunction) => { 
        try {
        await schema.parseAsync(req.body);
        next();
        } catch (error: unknown) {
        next(error);
        }
    };
};

export const ParamParserMiddleWare = (schema: z.ZodTypeAny) => {
    return async (req: Request, _res: Response, next: NextFunction) => { 
        try {
        await schema.parseAsync(req.params);
        next();
        } catch (error: unknown) {
        next(error);
        }
    };
};