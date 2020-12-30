import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

// Entities Modules
import { UserService } from './user.service';
import { PostService } from '../post/post.service';

// Entities
import { User } from '../entities/User';
import { Post } from '../entities/Post';

@Module({
    imports: [
      TypeOrmModule.forFeature([User, Post]),
    ],
    controllers: [UserController],
    providers: [UserService, PostService],
    exports: [UserService, TypeOrmModule]
  })
export class UserModule {}
