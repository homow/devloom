import express from 'express';
import {UserSchema} from "@validators/user.js";
import {signUpController} from "@controllers/v1/index.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

const authRouter = express.Router();

// authRouter
//     .route("/")
//     .get();

authRouter
    .route("/signup")
    .post(validateRequestBody(UserSchema), signUpController);

// authRouter
//     .route("/login")
//     .post();

export default authRouter;