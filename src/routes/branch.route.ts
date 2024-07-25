import { Router } from "express";
import BranchController from "../controllers/branch.controller";

const branchRouter = Router();

// post route
branchRouter.post(`/`, BranchController.create);

// get all branches
branchRouter.get(`/`, BranchController.getBranches);

// update route
branchRouter.put(`/:branchId`, BranchController.updateBranch);

// delete route
branchRouter.delete("/:branchId", BranchController.deleteBranch);

export default branchRouter;
