import express from 'express';
import { Response, Request, NextFunction } from 'express';
import boardsService from '../services/boardsService';
import { Board } from '@prisma/client';
import { NewBoardSchema, errorMiddleware, GetBoardSchema, ParserMiddleWare, ParamParserMiddleWare } from '../utils';
import { NewBoard } from '../types';

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


router.get('/:name', ParamParserMiddleWare(GetBoardSchema), passport.authenticate("jwt", {session: false}), async (req: Request, res: Response<Board | null>, next: NextFunction) => {
    try {
        const board = await boardsService.getBoardByName(req.params.name);
        res.json(board);
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

router.use(errorMiddleware);

export default router;