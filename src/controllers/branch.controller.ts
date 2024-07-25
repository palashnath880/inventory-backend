import { Request, Response } from "express";
import prisma from "../lib/prisma";

// create branch
const create = async (req: Request, res: Response) => {
  try {
    const newBranch = req.body;

    let slug: string = newBranch?.name;
    slug = slug.toLowerCase();
    newBranch.slug = slug;

    // check branch
    const getBranch = await prisma.branch.findUnique({ where: { slug } });

    if (getBranch) {
      return res.send({ message: `${newBranch?.name} exists` }).status(400);
    }

    // insert branch
    const result = await prisma.branch.create({ data: newBranch });
    res.send(result).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// get branch
const getBranches = async (
  req: Request<{}, {}, {}, { page: number; limit: number; search: string }>,
  res: Response
) => {
  try {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 50;
    const search = req?.query?.search;
    const skip = (page - 1) * limit;

    // filter query
    const filterQuery: any = {};

    if (search) {
      filterQuery.where = {
        name: { contains: search },
      };
    }

    // count query
    const count = await prisma.branch.count(filterQuery);

    // get branches
    const branches = await prisma.branch.findMany({
      ...filterQuery,
      skip: skip,
    });

    const result = {
      data: branches,
      count,
    };

    res.send(result);
  } catch (err) {
    res.send(err).status(400);
  }
};

// update branch
const updateBranch = async (req: Request, res: Response) => {
  try {
    const branchId = req.params?.branchId;
    const name = req?.body?.name;
    const address = req?.body?.address;

    // branch update
    const result = await prisma.branch.update({
      data: { address, name },
      where: { id: branchId },
    });

    res.send(result);
  } catch (err) {
    res.send(err).status(400);
  }
};

// delete branch
const deleteBranch = async (req: Request, res: Response) => {
  try {
    const branchId = req.params?.branchId;
    const result = await prisma.branch.delete({ where: { id: branchId } });
    res.send(result);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { create, getBranches, deleteBranch, updateBranch };
