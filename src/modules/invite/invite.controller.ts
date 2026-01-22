// import httpStatus from "http-status";
// import sendResponse from "../../utils/sendResponse";
// import catchAsync from "../../utils/catchAsync";

// export const register = catchAsync(async (req: Request, res: Response) => {
//   const  userData  = req.body;
//   const result = await registerUserToDB(userData);
  
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User registered successfully",
//     data: result,
//   });
// });