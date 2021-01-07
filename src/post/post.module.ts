import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./post.controller";

// Entities Modules
import { PostService } from "./post.service";
import { CommentService } from "../comment/comment.service";

// Entities
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostController],
  providers: [PostService, CommentService],
  exports: [PostService, TypeOrmModule]
})
export class PostModule {
}
