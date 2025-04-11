import express from 'express';
import { Response, Request, NextFunction } from 'express';
import boardsService from '../services/boardsService';
import { Board } from '@prisma/client';
import { NewBoardSchema, errorMiddleware, ParserMiddleWare, assertHasUser, assertHasBoardid, checkIfBoardExists } from '../utils';
import { NewBoard, joinBoard } from '../types';

const passport = require("passport");
const router = express.Router();

router.get('/', passport.authenticate("jwt", {session: false}), async (_req: Request, res: Response<Board[]>, next: NextFunction) => {
    try {
        const boards = await boardsService.getBoards();
        res.json(boards);
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/joined', passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Board[]>, next: NextFunction) => {
    try {
        assertHasUser(req);
        const boards = await boardsService.getJoinedBoards(req.user.id);
        res.json(boards);
    } catch (error: unknown) {
        next(error);
    };
});

router.post('/', ParserMiddleWare(NewBoardSchema), async (req: Request<unknown, unknown, NewBoard>, res: Response<Board>, next: NextFunction) => {
    try {
      const board: Board = await boardsService.createBoard(req.body);
      res.json(board);
    } catch (error: unknown){
      next(error);
    }
});

router.get('/:name', checkIfBoardExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Board | null>, next: NextFunction) => {
    try {
        assertHasBoardid(req);
        const board = await boardsService.getBoard(req.boardid);
        res.json(board);
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/:name/members', checkIfBoardExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<number>, next: NextFunction) => {
    try {
        assertHasUser(req);
        assertHasBoardid(req);
        const members = await boardsService.getTotalBoardMembers(req.boardid);
        res.json(members);
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/:name/joinstatus', checkIfBoardExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<boolean>, next: NextFunction) => {
    try {
        assertHasUser(req);
        assertHasBoardid(req);
        const joined = await boardsService.checkIfUserJoinedBoard(req.boardid, req.user.id);
        res.json(joined);
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/:name/join', checkIfBoardExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<joinBoard>, next: NextFunction) => {
    try {
        assertHasUser(req);
        assertHasBoardid(req);
        const status = await boardsService.joinBoard(req.boardid, req.user.id);
        const newMembers = await boardsService.getTotalBoardMembers(req.boardid);
        res.json({status, newMemberCount: newMembers});
    } catch (error: unknown) {
        next(error);
    };
});

router.get('/:name/leave', checkIfBoardExists, passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<joinBoard>, next: NextFunction) => {
    try {
        assertHasUser(req);
        assertHasBoardid(req);
        const status = await boardsService.leaveBoard(req.boardid, req.user.id);
        const newMembers = await boardsService.getTotalBoardMembers(req.boardid);
        res.json({status, newMemberCount: newMembers});
    } catch (error: unknown) {
        next(error);
    };
});

router.use(errorMiddleware);

export default router;