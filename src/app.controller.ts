import { Controller, Get, Redirect } from "@nestjs/common";
import { Public } from "nest-keycloak-connect";

@Controller()
export class AppController {
  constructor() {
  }

  @Get()
  @Public()
  home() {
    return `Welcome to API Post`;
  }

  @Get("new")
  newUrl() {
    return `Hello you're log`;
  }

  @Get("public")
  @Public()
  public() {
    return `Public route`;
  }
}