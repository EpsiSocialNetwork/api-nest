import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostModule } from '../post/post.module';

// Entities
import { User } from '../entities/User';
import { Post } from '../entities/Post';

@Module({
    imports: [TypeOrmModule.forFeature([User, Post]), PostModule],
    controllers: [UserController],
    providers: [UserService, PostModule],
    exports: [UserService, TypeOrmModule]
  })
export class UserModule {}
