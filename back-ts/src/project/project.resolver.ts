import { Body, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'shared/auth.guard';

import { ProjectDTO } from './project.dto';
import { IProject } from './project.interface';
import { ProjectService } from './project.service';

@Resolver('Project')
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query('allProjects')
  public async allProjects(): Promise<IProject[]> {
    return await this.projectService.showAll();
  }

  @Mutation('userProjects')
  // @UseGuards(new AuthGuard())
  public async userProjects(@Args('email') email: string): Promise<any> {
    return await this.projectService.userProjects(email);
  }

  @Mutation('createProject')
  // @UseGuards(new AuthGuard())
  public async createProject(@Args() data): Promise<any> {
    return await this.projectService.create(data);
  }
}
