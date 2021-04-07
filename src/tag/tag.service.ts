import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

// Entities
import { TagView } from "../entities/TagView";
import { TagByPostView } from "../entities/TagByPostView";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagView)
    private tagRepository: Repository<TagView>,
    @InjectRepository(TagByPostView)
    private tagByPostRepository: Repository<TagByPostView>
  ) {
  }

  findAll(): Promise<TagView[]> {
    return this.tagRepository.find();
  }

  findOne(id: string): Promise<TagView> {
    return this.tagRepository.findOne({ where: { uid: id } });
  }

  createTag(Tag: TagView): Promise<InsertResult> {
    return this.tagRepository.insert(Tag);
  }

  findAllTagByPostUid(id: string): Promise<TagByPostView[]> {
    return this.tagByPostRepository.find({ where: { uidPost: id } })
  }

  deleteAllTagByPostUid(id: string){
    return this.tagByPostRepository.delete({ uidPost:id });
  }
}