import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { OrdersService } from './order.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';

// Create new order
const createOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const result = await OrdersService.createOrdersService(orderData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  }
);

// get all orders Controller
const getAllOrdersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrdersService.getAllOrdersService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Order successfully',
      data: result,
    });
  }
);

export const OrdersController = {
  createOrderController,
  getAllOrdersController,
};
