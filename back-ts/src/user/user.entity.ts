import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntity } from 'project/project.entity';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(type => ProjectEntity, project => project.author)
  ideas: ProjectEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true) {
    const { id, username, email, token } = this;
    const responseObject = { id: id.toString(), username, email, token };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username, email } = this;
    return jwt.sign(
      {
        id,
        username,
        email,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '7d' },
    );
  }
}
