import { Body, Controller, Get, Post, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { TagService } from "./tag.service";

// Entities
import { Tag } from "../entities/Tag";
import { InsertResult } from "typeorm";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("tag")
@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get("/:uid")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the tag",
    type: String,
    required: true
  })
  findOne(@Param("uid") uid: string): Promise<Tag> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.tagService.findOne(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Post("")
  @Roles("myclient:USER")
  @ApiParam({
    name: "post",
    description: "new post",
    type: Post,
    required: true
  })
  @ApiBody({
    schema: {
      type: "Tag",
      example: {
        "text": "Tag Name",
        "color": "Red"
      }
    }
  })
  newTag(@Body() newTag: Tag): Promise<InsertResult> {
    return this.tagService.createTag(newTag);
  }
}