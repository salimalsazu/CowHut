import { IUser } from './user.interface';
import { User } from './user.model';

const createUserService = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  //   console.log(result);
  return result;
};

export const UserService = {
  createUserService,
};
