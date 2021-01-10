import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./post.controller";

// Entities Modules
import { PostService } from "./post.service";
import { CommentService } from "../comment/comment.service";
import { TagService } from "../tag/tag.service";

// Entities
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";
import { Tag } from "../entities/Tag";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Tag])],
  controllers: [PostController],
  providers: [PostService, CommentService, TagService],
  exports: [PostService, TypeOrmModule]
})
export class PostModule {
}
