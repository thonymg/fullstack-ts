import { Column, CreateDateColumn, Entity, ManyToOne, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from 'user/user.entity';

@Entity()
export class ProjectEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  project: string;

  @Column()
  description: string;

  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity;
}
