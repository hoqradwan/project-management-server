import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { projectRoutes } from "../modules/project/project.route";
// 


const router = express.Router();

router.use("/users", userRoutes);
// router.use("/invite", inviteRoutes);
router.use("/projects", projectRoutes);


export default router;
