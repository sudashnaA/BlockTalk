import { Board } from '@prisma/client';
import { NewBoard } from '../types';
import prisma from '../../data/prisma';

const getBoards = async (): (Promise<Board[]>) => {
    const boards: Board[] = await prisma.board.findMany();
    return boards;
};

const getJoinedBoards = async (boardid: number): (Promise<Board[]>) => {
    const data = await prisma.user.findUnique({
        where: {
          id: boardid
        },
        include: {
            boards: true
        }
    });

    if (data){
        return data.boards;
    } else{
        const arr: Board[] = [];
        return arr;
    }
};

const getBoard = async (boardid: number): (Promise<Board | null>) => {
    const board = await prisma.board.findUnique({
        where: {
            id: boardid
        },
        include: {
            posts: {
                include: {
                    comments: true
                }
            }
        }
    });
    return board;
};

const getBoardByName = async (name: string): (Promise<Board | null>) => {
    const board: Board | null = await prisma.board.findFirst({
        where: {
            name: {
            equals: name,
            mode: 'insensitive',
            },
        },
        include: {
            posts: {
                include: {
                    comments: true
                }
            }
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

const checkIfUserJoinedBoard = async (boardid: number, userid: number): Promise<boolean> => {
    const joined = await prisma.board.findUnique({
        where: {
            id: boardid
        },
        include: {
            users: {
                where: {
                    id: userid
                }
            }
        }
    })
    return joined?.users.length !== 0;
};

const joinBoard = async (boardid: number, userid: number): Promise<boolean> => {
    const joined = await prisma.board.update({
        where: {
            id: boardid,
        },
        data: {
            users: {
                connect: { id: userid }
            }
        }
    })
    return joined !== null;
};

const leaveBoard = async (boardid: number, userid: number): Promise<boolean> => {
    const left = await prisma.board.update({
        where: {
            id: boardid,
        },
        data: {
            users: {
                disconnect: { id: userid }
            }
        }
    })
    return left !== null;
};

const getTotalBoardMembers = async (boardid: number): Promise<number> => {
    const board = await prisma.board.findUnique({
        where: {
            id: boardid
        },
        include: {
            users: true
        }
    })
    return (board) ? board.users.length : 0
};

const checkIfBoardExists = async (name: string): Promise<boolean> => {
    const board: Board | null = await getBoardByName(name);
    return board === null;
};

const getBoardIdByName = async (name: string): Promise<number> => {
    const board = await prisma.board.findFirst({
        select: {
            id: true
        },
        where: {
            name: {
            equals: name,
            mode: 'insensitive',
            },
        }
    });
    return (board) ? board.id : -1
};

export default {
  getBoards,
  getJoinedBoards,
  getBoard,
  getBoardByName,
  createBoard,
  checkIfBoardExists,
  checkIfUserJoinedBoard,
  joinBoard,
  leaveBoard,
  getBoardIdByName,
  getTotalBoardMembers,
};
