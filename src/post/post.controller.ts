import {
  Body,
  Controller,
  Get,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post as HTTP_Post,
  Query
} from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { PostService } from "./post.service";
import { CommentService } from "../comment/comment.service";
import { TagService } from "../tag/tag.service";

// Entities
import { PostView } from "../entities/PostView";
import { InsertResult } from "typeorm";
import { TagByPostView } from "../entities/TagByPostView";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("post")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService, private readonly commentService: CommentService, private readonly tagService: TagService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<PostView[]> {
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
  findOne(@Param("uid") uid: string): Promise<PostView> {
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
    description: "uuid of the post",
    type: String,
    required: true
  })
  findAllCommentByPostUid(@Param("uid") uid): Promise<PostView[]> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.commentService.findAllCommentByPostUid(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Get("/:uid/tag")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the post",
    type: String,
    required: true
  })
  findAllTagByPostUid(@Param("uid") uid): Promise<TagByPostView[]> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.tagService.findAllTagByPostUid(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Get("/timeline/user")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uids",
    description: "uuids of the users you want to posts",
    type: String,
    required: true
  })
  findTimelinePostByUserUid(@Query("uids")uids : string): Promise<PostView[]> {
    //["ac6d8b12-44e2-4344-8f14-57b105102757", "ac6d8b12-44e2-4344-8f14-57b105102757"]
    let tabs = uids.split(",");

    let validateTabsUID = () => {
      let isValid = true;
      tabs.map(
        uid => {
          if(!validateUUID(uid))
          {
            isValid = false;
          }
        }
      )
      return isValid;
    }

    let validate = R.ifElse(
      () => validateTabsUID(),
      () => this.postService.findTimelinePostByUserUid(tabs),
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
    type: PostView,
    required: true
  })
  @ApiBody({
    schema: {
      type: "Post",
      example: {
        "uidUser": "ac6d8b12-44e2-4344-8f14-57b105102757",
        "text": "All it work"
      }
    }
  })
  newPost(@Body() newPost: PostView): Promise<InsertResult> {
    let validate = R.ifElse(
      () => validateUUID(newPost.uidUser),
      () => this.postService.createPost(newPost),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Delete("/:uid")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the post",
    type: String,
    required: true
  })
  deletePost(@Param("uid") uid: string): Promise<InsertResult> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.postService.deletePost(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}


