// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import AuthModel from "../model/auth.model";

// export const signup = async (req: Request, res: Response) => {
//   try {
//     const body = req.body;

//     const auth = await AuthModel.create(body);

//     const payload = {
//       fullname: auth.fullname,
//       mobile: auth.mobile,
//       email: auth.email,
//       password: auth.password,
//     };

//     const token = jwt.sign(
//       payload,
//       process.env.JWT_SECRET as string,
//       {
//         expiresIn: "7d",
//       }
//     );

//     res.status(200).json({
//       message: token,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };



import { Request, Response } from "express";
import AuthModel from "../model/auth.model";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

interface ErrorMessage extends Error {
    status?: number;
}

interface PayloadInterface {
    id: mongoose.Types.ObjectId;
    fullname: string;
    email: string;
    mobile: string
}
const accessTokenExpiry = "10m"

const generateToken = (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET_KEY!, { expiresIn: accessTokenExpiry })
    return accessToken
}


export const signup = async (req: Request, res: Response) => {
    try {
        await AuthModel.create(req.body)
        res.json({ message: "Signup successfully" })
    } catch (err: unknown) {
        if (err instanceof Error)
            res.status(500).json({ message: err.message })
    }
}



export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await AuthModel.findOne({ email: email })

        if (!user) {
            const err: ErrorMessage = new Error("User not found, please try to signup first")
            err.status = 404
            throw err
        }

        const isLogin = bcrypt.compare(password, user.password)

        if (!isLogin) {
            const err: ErrorMessage = new Error("Invalid credentials, email or password incorrect")
            err.status = 401
            throw err
        }

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile
        }

        const options = {
            httpOnly: true,
            maxAge: (10 * 60) * 1000,
            secure: false,
            domain: "localhost"
        }

        const accessToken = generateToken(payload);
        res.cookie("accessToken", accessToken, options)
        res.json({ message: accessToken })

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }

}
