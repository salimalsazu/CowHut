import mongoose from 'mongoose';
import { IOrder } from './order.interface';
import { CowProduct } from '../cow/cow.model';
import { User } from '../userAuth/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Order } from './order.model';

//Create Order Service
const createOrdersService = async (order: IOrder): Promise<IOrder | null> => {
  //   start session
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();

    // check buyer blance
    const cowData = await CowProduct.findById(order.cow);
    const buyer = await User.findById(order.buyer);

    if (!buyer || buyer.budget < (cowData?.price as number)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds.');
    }

    // cow data update
    if (!cowData || cowData.label === 'sold out') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is not available.');
    } else {
      await CowProduct.findByIdAndUpdate(
        { _id: order.cow },
        { label: 'sold out' },
        { new: true }
      );
    }

    // buyer data update
    if (buyer.role === 'buyer') {
      await User.findByIdAndUpdate(
        { _id: order.buyer },
        { budget: buyer.budget - cowData.price },
        { new: true }
      );
      await User.findByIdAndUpdate(
        { _id: cowData.seller },
        { income: buyer.income + cowData.price },
        { new: true }
      );
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a buyer');
    }

    // order create
    const result = await Order.create([order], { session });
    // Commit Transaction
    await session.commitTransaction();
    return result[0];
  } catch (error) {
    // Rollback Transaction / Abort Transaction
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

//Get All Orders Service
const getAllOrdersService = async (): Promise<IOrder[] | null> => {
  const result = await Order.find();
  return result;
};

export const OrdersService = {
  createOrdersService,
  getAllOrdersService,
};
