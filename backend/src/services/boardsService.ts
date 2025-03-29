import { Board } from '@prisma/client';
import { NewBoard } from '../types';
import prisma from '../../data/prisma';

const getBoards = async (): (Promise<Board[]>) => {
    const boards: Board[] = await prisma.board.findMany();
    return boards;
};

const getBoardByName = async (name: string): (Promise<Board | null>) => {
    const board: Board | null = await prisma.board.findFirst({
        where: {
            name: {
            equals: name,
            mode: 'insensitive',
            },
        }
    });
    return board;
};

const createBoard = async (board: NewBoard): Promise<Board> => {
    const newBoard: Board = await prisma.board.create({
        data:{
         ...board
        }
    });
    return newBoard;
};

const checkIfBoardExists = async (name: string): Promise<Boolean> => {
    const board: Board | null = await getBoardByName(name);
    return board === null;
};

export default {
  getBoards,
  getBoardByName,
  createBoard,
  checkIfBoardExists
};
