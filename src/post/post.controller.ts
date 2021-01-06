import { Controller, Get, Post as HTTP_Post, Param, Body, HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { Resource, Roles, Scopes, AllowAnyRole, Unprotected, Public } from 'nest-keycloak-connect';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

const validateUUID = require('uuid-validate');
const R = require('ramda');

// Services
import { PostService } from './post.service';

// Entities
import { Post } from '../entities/Post';
import { User } from "../entities/User";
import { InsertResult } from "typeorm";

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Roles('myclient:USER')
  findAll(): Promise<Post[]> {
      return this.postService.findAll();
  }

  @Get('/:uid')
  @Roles('myclient:USER')
  @ApiParam({
    name: "uid",
    description: "uuid of the post",
    type: String,
    required: true
  })
  findOne(@Param('uid') uid: string): Promise<Post> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.postService.findOne(uid),
      () => { throw new HttpException('Incorrect uuid format', HttpStatus.BAD_REQUEST) }
    )
    return validate()
  }

  @HTTP_Post('')
  @Roles('myclient:USER')
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
  newPost(@Body() newPost: Post): Promise<InsertResult>{
    let validate = R.ifElse(
      () => validateUUID(newPost.uidUser.uid),
      () => this.postService.createPost(newPost),
      () => { throw new HttpException('Incorrect uuid format', HttpStatus.BAD_REQUEST) }
    )
    return validate()
  }
}
