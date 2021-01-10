import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { CommentService } from "./comment.service";

// Entities
import { Comment } from "../entities/Comment";
import { InsertResult } from "typeorm";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get("/:uid")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the comment",
    type: String,
    required: true
  })
  findOne(@Param("uid") uid: string): Promise<Comment> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.commentService.findOne(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Post()
  @Roles("myclient:USER")
  @ApiParam({
    name: "comment",
    description: "new comment",
    type: Comment,
    required: true
  })
  @ApiBody({
    schema: {
      type: "Comment",
      example: {
        "uidUser": "ac6d8b12-44e2-4344-8f14-57b105102757",
        "uidPost": {
          "uid": "8ec9ead3-3afc-476c-967a-63f7767de9b7"
        },
        "text": "New Comment for a Post"
      }
    }
  })
  newComment(@Body() newComment: Comment): Promise<InsertResult> {
    let validate = R.ifElse(
      () => validateUUID(newComment.uidUser),
      () => this.commentService.createComment(newComment),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}