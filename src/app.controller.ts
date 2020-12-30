import { Controller, Request, Get, Post, UseGuards, Redirect } from '@nestjs/common';
import { Resource, Roles, Scopes, AllowAnyRole, Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Public()
  @Redirect("https://api.posthoop.julespeguet.fr")
  redirect(){}

  @Get('new')
  newUrl(){
    return `Hello you're log`;
  }

  @Get('public')
  @Public()
  public(){
    return `Public route`;
  }
}