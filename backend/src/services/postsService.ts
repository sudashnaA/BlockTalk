import { Post } from '@prisma/client';
import { NewPost } from '../types';
import prisma from '../../data/prisma';

const checkIfPostExists = async (postid: number): Promise<boolean> => {
    const post = await prisma.post.findUnique({
        where: {
            id: postid,
        }
    })

    return post !== null;
};  

const getPostsInBoard = async (boardid: number): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
        where: {
            boardid
        }
    })
    return (posts) ? posts : [];
}

const getPostInBoard = async (boardid: number, postid: number): Promise<Post | null> => {
    const post = await prisma.post.findUnique({
        where: {
            id: postid,
            boardid
        }
    })
    return post;
}

const createPostInBoard = async (post: NewPost): Promise<Post> => {
    const newPost: Post = await prisma.post.create({
        data:{
            ...post
        }
    })
    return newPost;
};

export default {
    checkIfPostExists,
    createPostInBoard,
    getPostsInBoard,
    getPostInBoard,
};
