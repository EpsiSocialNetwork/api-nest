import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagController } from "./tag.controller";

// Entities Modules
import { TagService } from "./tag.service";

// Entities
import { Tag } from "../entities/Tag";

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService, TypeOrmModule]
})
export class TagModule {
}
