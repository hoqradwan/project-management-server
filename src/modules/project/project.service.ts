import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

export const createProjectIntoDB = async (projectData: IProject,userId:string) => {
    const { name, description } = projectData;
    
    const project = await Project.create({
        name,
        description : description || "",
        createdBy: userId,
    });
    return project;
}
export const getAllProjectsFromDB = async ( page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    const projects = await Project.find().skip(skip).limit(limit);
        
    const total = await Project.countDocuments();
    return {
        projects,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
}

export const updateProjectIntoDB = async (id: string, projectData: Partial<IProject>) => {
    const project = await Project.findByIdAndUpdate(id, projectData, { new: true });
    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }
    return project;
}
export const deleteProjectFromDB = async (id: string) => {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }
    return project;
}