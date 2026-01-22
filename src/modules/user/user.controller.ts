import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { changeUserRoleIntoDB, changeUserStatusIntoDB, getAllUsersFromDB, getPRofileInfoFromDB, inviteUserInToDB, loginUserToDB, registerViaInviteIntoDB } from "./user.service";
import { CustomRequest } from "../../utils/customRequest";


export const login = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await loginUserToDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
export const inviteUser = catchAsync(async (req: Request, res: Response) => {
  const { email, role } = req.body;
  const result = await inviteUserInToDB(email, role);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User invited successfully",
    data: {
      token: result,
      inviteLink: `http://localhost:3000/register?token=${result}`
    },
  });
});
export const registerViaInvite = catchAsync(async (req: Request, res: Response) => {
  const registerData = req.body;
  const result = await registerViaInviteIntoDB(registerData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
export const changeUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await changeUserRoleIntoDB(id, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role changed successfully",
    data: result,
  });
});
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully",
    data: result,
  });
});
export const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await changeUserStatusIntoDB(id, status);

  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "User status changed successfully",
    data: result,
  });
});

export const getSelfInfo = catchAsync(async (req: CustomRequest, res: Response) => {

  const user = req.user;
  const result = await getPRofileInfoFromDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile information retrieved successfully",
    data: result,
  });
});