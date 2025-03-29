import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JsonWebToken } from "../types";

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export function issueJWT(user: User): JsonWebToken {
  const id = user.id;

  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now() / 1000
  };

  const signedToken = jwt.sign(payload, process.env.SECRET as string, {expiresIn: expiresIn});

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}
