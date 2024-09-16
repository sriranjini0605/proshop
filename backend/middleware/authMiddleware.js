import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";


//protect routes for users that are registered
const protect = asyncHandler(async (req,res,next) => {
    let token;

    //read the jwt from the cookie
    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
            
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

//admin middleware for users that are admins

const admin = asyncHandler(async (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error("Not authorized, not an admin");
    }
});

export {admin, protect};

