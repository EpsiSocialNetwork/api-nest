import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { Comment } from "../entities/Comment";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  findAllCommentByUserUid(id: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        uidUser: id
      }
    });
  }

  findAllCommentByPostUid(id: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        uidPost: id
      }
    });
  }

  createComment(comment: Comment): Promise<InsertResult> {
    return this.commentRepository.insert(comment);
  }
}