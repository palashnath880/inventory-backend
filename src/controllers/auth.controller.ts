import { Request, Response } from "express";
import type { LoginBody } from "../types";
import prisma from "../lib/prisma";
import PWD from "../lib/password";
import jwt from "jsonwebtoken";

// user login
const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";

    // get user
    const getUser = await prisma.user.findUnique({ where: { email } });
    if (!getUser) {
      return res.send({ message: `User not found` }).status(404);
    }

    // compare pwd
    if (!(await PWD.comparePwd(password, getUser?.password))) {
      return res.send({ message: `Invalid credentials` }).status(401);
    }

    // generate token
    const token = await jwt.sign(getUser, JWT_SECRET_KEY, { expiresIn: "7d" });

    // send response with token
    return res.send({ token });
  } catch (err) {
    return res.send(err).status(400);
  }
};

export default { login };
