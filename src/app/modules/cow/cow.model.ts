import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { breed, category, label, location } from './cow.constant';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: location,
      required: true,
    },

    breed: {
      type: String,
      enum: breed,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: label,
      required: true,
    },
    category: {
      type: String,
      enum: category,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const CowProduct = model<ICow, CowModel>('Cow', CowSchema);
