import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagController } from "./tag.controller";

// Entities Modules
import { TagService } from "./tag.service";

// Entities
import { TagView } from "../entities/TagView";
import { TagByPostView } from "../entities/TagByPostView";

@Module({
  imports: [TypeOrmModule.forFeature([TagView, TagByPostView])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService, TypeOrmModule]
})
export class TagModule {
}
