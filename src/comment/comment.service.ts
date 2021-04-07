import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, InsertResult, Repository } from "typeorm";
import { CommentView } from "../entities/CommentView";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentView)
    private commentRepository: Repository<CommentView>
  ) {
  }

  findAll(): Promise<CommentView[]> {
    return this.commentRepository.find();
  }

  findOne(id: string): Promise<CommentView> {
    return this.commentRepository.findOne({ where: { uid: id } });
  }

  findAllCommentByPostUid(id: string): Promise<CommentView[]> {
    return this.commentRepository.find({
      where: {
        uidPost: id
      }
    });
  }

  createComment(comment: CommentView): Promise<InsertResult> {
    return this.commentRepository.insert(comment);
  }

  deleteComment(id: string): Promise<DeleteResult> {
    return this.commentRepository.delete({ uid: id });
  }

  deleteAllCommentByPostUid(id: string): Promise<DeleteResult> {
    return this.commentRepository.delete({ uidPost: id });
  }
}