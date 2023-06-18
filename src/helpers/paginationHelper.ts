import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  minPrice: number;
  maxPrice: number;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);

  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';

  const sortOrder = options.sortOrder || 'desc';

  const minPrice = options.minPrice as number;

  const maxPrice = options.maxPrice as number;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  };
};

export const paginationHelpers = { calculatePagination };
