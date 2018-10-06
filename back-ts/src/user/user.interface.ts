
export interface IUser  {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly email: string;
  readonly password: string;
  readonly username: string;
}
