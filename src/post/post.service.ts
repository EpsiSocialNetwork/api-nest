import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/Post';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: string): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  findAllPostByUserUid(id: string): Promise<Post[]> {
    return this.postRepository.find({
      where:{
        uidUser: id
      }
    });
  }
}
