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

export const signup = async (req: Request, res: Response) => {
  try {
    await AuthModel.create(req.body);

    res.status(200).json({
      message: "Signup successful",
    });
  } catch (err: unknown) {
    if (err instanceof Error)
      res.status(500).json({
        message: err.message,
      });
  }
};

export const login = async (req: Request, res: Response) => {
  
    const { email, password } = req.body;
    const User = await AuthModel.findOne({ email:email });

    // if(!User)
    //   throw new Error("user not found , please try to signup first, 404")

    if(!User){
      const err = Error
    }

    }
