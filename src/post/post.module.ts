import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./post.controller";

// Entities Modules
import { PostService } from "./post.service";
import { CommentService } from "../comment/comment.service";
import { TagService } from "../tag/tag.service";

// Entities
import { PostView } from "../entities/PostView";
import { CommentView } from "../entities/CommentView";
import { TagView } from "../entities/TagView";
import { TagByPostView } from "../entities/TagByPostView";

@Module({
  imports: [TypeOrmModule.forFeature([PostView, CommentView, TagView, TagByPostView])],
  controllers: [PostController],
  providers: [PostService, CommentService, TagService],
  exports: [PostService, TypeOrmModule]
})
export class PostModule {
}
