import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

// Entities
import { CommentView } from "../entities/CommentView";

@Module({
  imports: [TypeOrmModule.forFeature([CommentView])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService, TypeOrmModule]
})
export class CommentModule {
}
