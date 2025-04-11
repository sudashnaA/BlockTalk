import express from 'express';
import { Response, Request, NextFunction } from 'express';
import postsService from '../services/postsService';
import { Post } from '@prisma/client';
import { errorMiddleware, checkIfBoardExists, ParserMiddleWare, assertHasUser, assertHasBoardid, assertHasPostid, PostSchema, GetPostSchemea } from '../utils';

const passport = require("passport");
const router = express.Router({
    mergeParams: true
});

const checkIfPostExists = async (req: Request, _res: Response, next: NextFunction) => { 
    try {
        await GetPostSchemea.parseAsync(req.params);
        req.postid = parseInt(req.params.postid);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

router.post('/', checkIfBoardExists, ParserMiddleWare(PostSchema), passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Post>, next: NextFunction) => {
    try {
        assertHasUser(req);
        assertHasBoardid(req);
        const newPost = await postsService.createPostInBoard({...req.body, userid: req.user.id, boardid: req.boardid});
        res.json(newPost);
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/', checkIfBoardExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Post[]>, next: NextFunction) => {
    try {
        assertHasBoardid(req);
        const posts = await postsService.getPostsInBoard(req.boardid);
        res.json(posts);
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/:postid', checkIfBoardExists, checkIfPostExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Post | null>, next: NextFunction) => {
    try {
        assertHasBoardid(req);
        assertHasPostid(req);
        const post = await postsService.getPostInBoard(req.boardid, req.postid);
        res.json(post);
    } catch (error: unknown) {
        next(error);
    };
});

// router.put('/:name/posts/:postid', checkIfBoardExists, ParserMiddleWare(PostSchema), passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Post[]>, next: NextFunction) => {
//     try {
//         assertHasUser(req);
//         assertHasBoardid(req);
//         const updatedPost = await postsService.getPostsInBoard(req.boardid);
//         res.json(posts);
//     } catch (error: unknown) {
//         next(error);
//     };
// });



router.use(errorMiddleware);

export default router;