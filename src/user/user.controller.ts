import { Controller, Get, Param, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { throwError } from 'rxjs';

const validateUUID = require('uuid-validate');
const R = require('ramda');

// Services
import { UserService } from './user.service';
import { PostService } from '../post/post.service';

// Entities
import { User } from '../entities/User';
import { Post } from '../entities/Post';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<User[]> {
      return this.userService.findAll();
  }

  @Get('/:uid')
  @ApiParam({
    name: "uid",
    type: String,
    required: true
  })
  findOne(@Param('uid') uid: string): Promise<User> {
      let validate = R.ifElse(
        () => validateUUID(uid),
        () => this.userService.findOne(uid),
        () => { throw new HttpException('Incorrect uuid format', HttpStatus.BAD_REQUEST) }
      )
      return validate()
  }

  @Get('/:uid/post')
  @ApiParam({
    name: "uid",
    type: String,
    required: true
  })
  findAllPostByUserUid(@Param('uid') uid, @Param('uid') uidPost): Promise<Post[]> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.postService.findAllPostByUserUid(uid),
      () => { throw new HttpException('Incorrect uuid format', HttpStatus.BAD_REQUEST) }
    )
    return validate();
  }
}