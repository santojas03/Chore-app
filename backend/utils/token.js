import jwt from "jsonwebtoken";

const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
}

export const signToken = (userId) =>
  jwt.sign({ sub: userId.toString() }, getSecret(), { expiresIn: EXPIRES_IN });

// Throws if the token is invalid or expired.
export const verifyToken = (token) => jwt.verify(token, getSecret());
