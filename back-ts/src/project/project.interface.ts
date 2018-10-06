import { IUser } from 'user/user.interface';
import { ObjectID } from 'typeorm';

export interface IProject{
  readonly id: ObjectID;
  readonly author?: IUser;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly project: string;
  readonly description: string;
}
