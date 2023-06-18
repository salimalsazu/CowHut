import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IpaginationOptions } from '../../../interface/pagination';
import { CowsSearchAbleFileds } from './cow.constant';
import { CowsFilter, ICow } from './cow.interface';
import { CowProduct } from './cow.model';
import { User } from '../userAuth/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

//Create Cow Product Service
const createCowService = async (payload: ICow): Promise<ICow> => {
  //getting user
  const userData = await User.findById(payload.seller);

  //User Role Check
  if (userData?.role === 'seller') {
    const result = await CowProduct.create(payload);
    return result;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not a seller');
  }
};

// get All Cow Product Service
const getAllCowService = async (
  filters: CowsFilter,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: CowsSearchAbleFileds.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } =
    paginationHelpers.calculatePagination(paginationOptions);

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whenConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await CowProduct.find(whenConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await CowProduct.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//get Single Cow Service
const getSingleCowService = async (id: string): Promise<ICow | null> => {
  const result = await CowProduct.findById(id);
  return result;
};

//Update Single Cow Srvice
const updateSingleCowsService = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await CowProduct.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

//Delete single Cow Service
const deleteSingleCowsService = async (id: string): Promise<ICow | null> => {
  const result = await CowProduct.findByIdAndDelete(id);
  return result;
};

export const CowsService = {
  createCowService,
  getAllCowService,
  getSingleCowService,
  updateSingleCowsService,
  deleteSingleCowsService,
};
