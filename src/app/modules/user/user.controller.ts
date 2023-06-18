import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { IUser } from '../userAuth/user.interface';

const getAllUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users fetched successfully',
    data: result,
  });
});

const getSingleUserController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.getSingleUserService(id);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single User get Successfully',
      data: result,
    });
  }
);

const deleteUserController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUserService(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted Successfully',
    data: result,
  });
});

const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;

  const result = await UserService.updateUserService(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated Successfully',
    data: result,
  });
});

export const UserController = {
  getAllUserController,
  getSingleUserController,
  deleteUserController,
  updateUserController,
};
