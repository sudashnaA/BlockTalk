import express from 'express';
import { Response, Request, NextFunction } from 'express';
import postsService from '../services/postsService';
import { errorMiddleware, IDSchema, ParamParserMiddleWare } from '../utils';
import { Post } from '@prisma/client';

const passport = require("passport");
const router = express.Router({mergeParams: true});

router.get('/', ParamParserMiddleWare(IDSchema), passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Post[]>, next: NextFunction) => {
    try {
        const posts = await postsService.getPostsFromBoard(Number(req.params.boardid));
        res.json(posts);
    } catch (error: unknown) {
        next(error);
    };
});


router.use(errorMiddleware);

export default router;