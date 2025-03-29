import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { NewUserSchema, LoginUserSchema, errorMiddleware, ParserMiddleWare } from '../utils';
import { User, NewUser, LoginUser, JsonWebToken, passportUser } from '../types';
import usersService from "../services/usersService";

import { issueJWT } from '../lib/jwt';
const passport = require("passport");

const router = express.Router();


router.get('/verify', passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<passportUser>) => {
    res.send(req.user as passportUser);
});

router.post('/login', ParserMiddleWare(LoginUserSchema), async (req: Request<unknown, unknown, LoginUser>, res: Response<JsonWebToken>, next: NextFunction) => {
    try {
      const user = await usersService.getUserByUsername(req.body.username);
      if (user){
        const jwt = issueJWT(user);
        res.json(jwt);
      } 
    }
    catch (error: unknown){
        next (error);
    };
});

router.post('/register', ParserMiddleWare(NewUserSchema), async (req: Request<unknown, unknown, NewUser>, res: Response<User>, next: NextFunction) => {
    try {
      const user: User = await usersService.createNewUser(req.body);
      res.json(user);
    } catch (error: unknown){
      next(error);
    }
});

router.use(errorMiddleware);

export default router;