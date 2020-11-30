import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';

// Entities
import { Post } from '../entities/Post';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService, TypeOrmModule]
  })
export class PostModule {}
