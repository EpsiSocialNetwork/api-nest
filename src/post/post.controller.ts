import { Controller, Get, Param, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import { Resource, Roles, Scopes, AllowAnyRole, Unprotected, Public } from 'nest-keycloak-connect';
import { ApiTags, ApiParam } from '@nestjs/swagger';

const validateUUID = require('uuid-validate');
const R = require('ramda');

// Services
import { PostService } from './post.service';

// Entities
import { Post } from '../entities/Post';

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
}
