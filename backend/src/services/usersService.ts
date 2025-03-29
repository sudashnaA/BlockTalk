import { User, NewUser } from '../types';
import prisma from '../../data/prisma';
import bcrypt from 'bcryptjs'

const getUserByUsername = async (username: string): (Promise<User | null>) => {
    const user: User | null = await prisma.user.findUnique({
      where: {
       username
      }
    })
    return user;
}

const checkIfUsernameInUse = async (username: string): Promise<boolean> => {
    const user: User| null = await prisma.user.findUnique({
      where:{
        username
      }
    });
    return user === null;
};

const verifyPassword = async (username: string, password: string): Promise<boolean> => {
  const user: User| null = await prisma.user.findUnique({
    where:{
      username
    }
  });

  let valid: boolean = false;
  if (user){
    valid = await bcrypt.compare(password, user.password);
  }
  return valid;
};

const createNewUser = async (user: NewUser): Promise<User> => {
  const hashedPassword: string = await bcrypt.hash(user.password, 10);

    const newUser: User = await prisma.user.create({
      data:{
        username: user.username,
        password: hashedPassword,
      }
    })
    return newUser;
};

export default {
  createNewUser,
  getUserByUsername,
  checkIfUsernameInUse,
  verifyPassword
}
