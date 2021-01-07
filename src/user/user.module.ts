import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";

// Entities Modules
import { UserService } from "./user.service";
import { PostService } from "../post/post.service";
import { CommentService } from "../comment/comment.service";

// Entities
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment])
  ],
  controllers: [UserController],
  providers: [UserService, PostService, CommentService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {
}
