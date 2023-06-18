import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CowsService } from './cow.service';
import pick from '../../../shared/pick';
import { CowsFilterAbleFileds } from './cow.constant';
import { paginationFields } from '../../../constant.ts/pagination';
import { ICow, CowsFilter } from './cow.interface';

//Create Cow Controller
const createCowController = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowsService.createCowService(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Cow Product is createded successfully`,
    data: result,
  });
});

//Get All Cows Controller
const getAllCowsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CowsFilterAbleFileds);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowsService.getAllCowService(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Cow Product get Successfully',
    meta: result.meta,
    data: result.data,
  });
});

//get the single Cow Cntroller
const getSingleCowsController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CowsService.getSingleCowService(id);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Cow Product get Successfully',
      data: result,
    });
  }
);

//Update a single Cow Controller
const updateSingleCowsController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const updatedData = req.body;

    const result = await CowsService.updateSingleCowsService(id, updatedData);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow Product updated Successfully',
      data: result,
    });
  }
);

//delete Single Cows Service
const deleteSingleCowsController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await CowsService.deleteSingleCowsService(id);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow Product deleted Successfully',
      data: result,
    });
  }
);

export const CowsController = {
  createCowController,
  getAllCowsController,
  getSingleCowsController,
  updateSingleCowsController,
  deleteSingleCowsController,
};
