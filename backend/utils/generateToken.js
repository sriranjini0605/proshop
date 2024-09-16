import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      //set JWT as http-only cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "production", //it will be https only when it's in production
        sameSite: "strict",
        maxAge: 30 * 60 * 24 * 60 * 1000, //30 days
      });
}

export default generateToken;