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
        "uidUser": {
          "uid": "ac6d8b12-44e2-4344-8f14-57b105102757"
        },
        "uidPost": {
          "uid": "9bf1a5e8-bc37-41a0-ada9-b377a44b5a2d"
        },
        "text": "New Comment"
      }
    }
  })
  newComment(@Body() newComment: Comment): Promise<InsertResult> {
    let validate = R.ifElse(
      () => validateUUID(newComment.uidUser.uid),
      () => this.commentService.createComment(newComment),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}