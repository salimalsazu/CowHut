import { Model, Types } from 'mongoose';
import { IUser } from '../userAuth/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh';

  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahiwal'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej';
  weight: number;
  label: 'for sale' | 'sold out';
  category: 'Beef' | 'Dairy' | 'DualPurpose';
  seller: Types.ObjectId | IUser;
};

export type CowsFilter = {
  searchTerm?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
