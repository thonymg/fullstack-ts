import { Mutation, Query, Resolver, Args, Parent } from '@nestjs/graphql';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('allUsers')
  public async allUsers(): Promise<IUser[]> {
    return await this.userService.showAll();
  }

  @Query('user')
  public async oneProject(@Args('username') username: string): Promise<any> {
    return await this.userService.read(username);
  }

  @Mutation('register')
  public async register(@Args() args: any): Promise<any> {
    return await this.userService.register(args);
  }

  @Mutation('login')
  public async updateUser(@Args() args): Promise<any> {

    return await this.userService.login(args);
  }
}
