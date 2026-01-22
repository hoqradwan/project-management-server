import { Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { createProjectIntoDB, deleteProjectFromDB, getAllProjectsFromDB, updateProjectIntoDB } from "./project.service";
import { CustomRequest } from "../../utils/customRequest";

export const createProject = catchAsync(async (req: CustomRequest, res: Response) => {
    const projectData = req.body;
    const { id: userId } = req.user;
    const result = await createProjectIntoDB(projectData, userId);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Project created successfully",
        data: result,
    });
});
export const getAllProjects = catchAsync(async (req: CustomRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await getAllProjectsFromDB( page, limit);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Projects retrieved successfully",
        data: result,
    });
});
export const updateProject = catchAsync(async (req: CustomRequest, res: Response) => {
   const { id } = req.params;
   const projectData = req.body;
   const result = await updateProjectIntoDB(id, projectData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project updated successfully",
        data: result,
    });
});
export const deleteProject = catchAsync(async (req: CustomRequest, res: Response) => {
   const { id } = req.params;
   const result = await deleteProjectFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project deleted successfully",
        data: result,
    });
});
