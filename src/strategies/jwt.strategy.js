import jwtPassport from "passport-jwt";

const JWTStrategy = jwtPassport.Strategy;
const ExtractJWT = jwtPassport.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCookieToken"];
  }
  return token;
};

export const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwt_payload, done) => {
    console.log(jwt_payload);
    try {
      return done(null, { user: jwt_payload });
    } catch (error) {
      done(error);
    }
  },
);
