import { User } from './../userAuth/user.model';
import { IUser } from './../userAuth/user.interface';

//get the all user
const getAllUsers = async (): Promise<IUser[]> => {
  const andConditions: IUser[] = [];

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions);

  return result;
};

//get the single user
const getSingleUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

//delete the user
const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

//Update The user
const updateUserService = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUserService,
  deleteUserService,
  updateUserService,
};
