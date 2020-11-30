import { Controller, Get, Param, Header} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { PostService } from './post.service';

// Entities
import { Post } from '../entities/Post';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<Post[]> {
      return this.postService.findAll();
  }

  @Get('/:uid')
  findOne(@Param('uid') uid): Promise<Post> {
      return this.postService.findOne(uid);
  }
}
