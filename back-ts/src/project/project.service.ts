import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';

import { ProjectDTO } from './project.dto';
import { ProjectEntity } from './project.entity';
import { UserEntity } from 'user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  private toResponseObject(project) {
    return { ...project, id: project.id.toString() };
  }

  async showAll() {
    const projects = await this.projectRepository.find();
    return projects.map(project => this.toResponseObject(project));
  }

  async create(data): Promise<any> {
    const { email } = data;
    const user = await this.userRepository.findOne({ where: { email } });

    const project = await this.projectRepository.create({
      ...data,
      author: { ...user, id: user.id.toString() }
    });

    await this.projectRepository.save(project);

    return { ...project };
  }

  async userProjects(email: string) {
    const projects = await this.projectRepository.find({ relations: ['author'] });
    if (!projects) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return projects;
  }

  async update(_id: ObjectID, data: Partial<ProjectDTO>): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne(_id);
    if (!project) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.projectRepository.update(_id, data);
    return await this.projectRepository.findOne(_id);
  }

  async destroy(_id: ObjectID) {
    const project = await this.projectRepository.findOne(_id);
    if (!project) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.projectRepository.delete(_id);
    return { deleted: true };
  }
}
