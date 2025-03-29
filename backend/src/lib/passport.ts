import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { WithSecretOrKey } from "passport-jwt";
import prisma from "../../data/prisma";
import { passportUser } from "../types";

const passport = require("passport");

const options: WithSecretOrKey = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.SECRET as string,
}

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user: passportUser = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        id: payload.sub,
      },
    })

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch(err) {
    return done(err, null);
  }
});

passport.use(strategy);