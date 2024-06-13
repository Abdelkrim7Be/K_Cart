import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // expiresIn : '1d',//1 day
    expiresIn: "120d", //1 day
  });

  // Set JWT as an HTTP Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    // In production , that'll be true
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", //That will prevent attacks
    maxAge: 120 * 24 * 60 * 60 * 1000, // 120 days in milliseconds
  });
};

export default generateToken;
