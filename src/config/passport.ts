import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/user1';

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'defaultSecret',  // Add a default value or throw an error if undefined
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;









// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/User';
// import dotenv from 'dotenv';

// dotenv.config();

// if (!process.env.JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined");
// }

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

// export default (passport: any) => {
//   passport.use(
//     new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
//       try {
//         const user = await User.findById(jwt_payload.id);
//         if (user) {
//           return done(null, user);
//         }
//         return done(null, false);
//       } catch (err) {
//         return done(err, false);
//       }
//     })
//   );
// };
