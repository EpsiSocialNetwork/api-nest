import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

// Services
import { CommentService } from "../comment/comment.service";
import { TagService } from "../tag/tag.service";

// Entities
import { PostView } from "../entities/PostView";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostView)
    private postRepository: Repository<PostView>,
    private commentService: CommentService,
    private tagService: TagService
  ) {
  }

  findAll(): Promise<PostView[]> {
    return this.postRepository.find();
  }

  findOne(id: string): Promise<PostView> {
    return this.postRepository.findOne({ where: { uid: id } });
  }

  createPost(post: PostView): Promise<InsertResult> {
    return this.postRepository.insert(post);
  }

  findTimelinePostByUserUid(ids: string[]) {
    return this.postRepository
      .createQueryBuilder("post")
      .where("post.uidUser IN (:...ids)", {ids: ids})
      .orderBy("post.createdAt", "DESC")
      .getMany()
  }

  deletePost(id: string){
    this.commentService.deleteAllCommentByPostUid(id);
    this.tagService.deleteAllTagByPostUid(id);
    return this.postRepository.delete({ uid: id });
  }
}
