import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await UserService.createUserService(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is created successfully`,
    data: result,
  });
});

export const UserController = {
  createUserController,
};
