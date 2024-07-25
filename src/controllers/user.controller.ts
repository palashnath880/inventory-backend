import { Request, Response } from "express";
import prisma from "../lib/prisma";

// create user
const create = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

    // get user by email and phone no
    const getUserByEmail = await prisma.user.findUnique({
      where: {
        email: newUser?.email || "",
      },
    });
    const getUserByPhone = await prisma.user.findUnique({
      where: {
        phoneNo: newUser?.phoneNo || "",
      },
    });

    // check user exists
    if (getUserByEmail || getUserByPhone) {
      let message: string; // error message
      if (getUserByEmail?.email === newUser?.email) {
        message = "User exists at this email";
      } else {
        message = "User exists at this phone no";
      }
      res.send({ message }).status(400);
    }

    // created user
    const result = await prisma.user.create({
      data: { ...newUser },
    });

    // send response
    res.send(result).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// get all users
const getUsers = async (
  req: Request<{}, {}, {}, { page: number; limit: number; search: string }>,
  res: Response
) => {
  try {
    const page: number = req?.query?.page || 1;
    const limit: number = req?.query?.limit || 50;
    const search: string = req?.query?.search || "";
    const skip = (page - 1) * limit;

    // filter query
    const filterQuery: any = {};

    if (search) {
      filterQuery.where = {
        name: { contains: search },
      };
    }

    // count query
    const count = await prisma.user.count(filterQuery);

    // get users
    const users = await prisma.user.findMany({
      skip: skip,
      ...filterQuery,
    });

    const result = {
      count: count,
      data: users,
    };

    // send response
    res.send(result);
  } catch (err) {
    res.send(err).status(400);
  }
};

// update user
const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = req.body;

    // if password has in the request body
    if (data?.password) {
      delete data?.password;
    }

    // if user not found
    const getUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!getUser) {
      return res.send({ message: "User not found" }).status(404);
    }

    // update user
    await prisma.user.update({
      where: { id: userId },
      data,
    });

    // send response
    res.send({ message: "UPDATED" });
  } catch (err) {
    res.send(err).status(400);
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.send({ message: "User not found" }).status(404);
    }

    const result = await prisma.user.delete({ where: { id: userId } });

    res.send(result);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { create, deleteUser, getUsers, update };
