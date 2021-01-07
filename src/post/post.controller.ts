import { Body, Controller, Get, HttpException, HttpStatus, Param, Post as HTTP_Post } from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { PostService } from "./post.service";
import { CommentService } from "../comment/comment.service";

// Entities
import { Post } from "../entities/Post";
import { InsertResult } from "typeorm";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("post")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService, private readonly commentService: CommentService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get("/:uid")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the post",
    type: String,
    required: true
  })
  findOne(@Param("uid") uid: string): Promise<Post> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.postService.findOne(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Get("/:uid/comment")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    type: String,
    required: true
  })
  findAllCommentByUserUid(@Param("uid") uid): Promise<Post[]> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.commentService.findAllCommentByPostUid(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @HTTP_Post("")
  @Roles("myclient:USER")
  @ApiParam({
    name: "post",
    description: "new post",
    type: Post,
    required: true
  })
  @ApiBody({
    schema: {
      type: "Post",
      example: {
        "uidUser": {
          "uid": "ac6d8b12-44e2-4344-8f14-57b105102757"
        },
        "text": "My new Post text"
      }
    }
  })
  newPost(@Body() newPost: Post): Promise<InsertResult> {
    let validate = R.ifElse(
      () => validateUUID(newPost.uidUser.uid),
      () => this.postService.createPost(newPost),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}
