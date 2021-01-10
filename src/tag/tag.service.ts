import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {
  }

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOne(id);
  }

  createTag(Tag: Tag): Promise<InsertResult> {
    return this.tagRepository.insert(Tag);
  }

  findAllTagByPostUid(id: string): Promise<Tag[]> {
    return this.tagRepository
      .createQueryBuilder("tag")
      .leftJoin("tag.posts", "posts")
      .where("posts.uid = :id", { id: id })
      .getMany();
  }
}