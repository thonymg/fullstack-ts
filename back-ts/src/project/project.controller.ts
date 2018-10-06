import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectDTO } from './project.dto';
import { ObjectID } from 'typeorm';
import { AuthGuard } from 'shared/auth.guard';
import { User } from 'user/user.decorators';

@Controller('api/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('/')
  async showAllProjects() {
    return await this.projectService.showAll();
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  async createProject(@User('email') email, @Body() project: ProjectDTO) {
    return await this.projectService.create(email, project);
  }

  @Post('/:email')
  async userProjects(@User('email') email: string, @Body() project: Partial<ProjectDTO>) {
    return await this.projectService.userProjects(email);
  }

  @Put('/:id')
  @UseGuards(new AuthGuard())
  async updateProject(@User('email') email, @Param('id') id: ObjectID, @Body() project: Partial<ProjectDTO>) {
    return await this.projectService.update(id, project);
  }

  @Delete('/:id')
  @UseGuards(new AuthGuard())
  async destroyProject(@User('email') email, @Param('id') id: ObjectID) {
    return await this.projectService.destroy(id);
  }
}
