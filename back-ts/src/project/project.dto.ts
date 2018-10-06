import { IsString } from 'class-validator';

export class ProjectDTO {
  @IsString()
  project: string;
  @IsString()
  description: string;
}
