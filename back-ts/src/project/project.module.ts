import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserEntity } from 'user/user.entity';
import { ProjectEntity } from './project.entity';
import { ProjectResolver } from './project.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UserEntity])],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectResolver]
})
export class ProjectModule {}
