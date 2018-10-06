import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users/')
  async showAllUsers() {
    return await this.userService.showAll();
  }

  @Post('login/')
  async login(@Body() data) {
    return await this.userService.login(data);
  }

  @Post('register/')
  async register(@Body() data) {
    return await this.userService.register(data);
  }
}
