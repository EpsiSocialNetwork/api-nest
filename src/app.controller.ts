import { Controller, Request, Get, Post, UseGuards, Redirect } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { KeycloakAuthGuard } from './auth/keycloak-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Redirect("https://api.posthoop.julespeguet.fr")
  redirect(){}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('keycloak')
  @UseGuards(KeycloakAuthGuard)
  keycloakConnect(@Request() req) {
    return req.user;
  }

  @Get('new')
  newUrl(){
    return `Hello you're log`;
  }

  @Get('public')
  public(){
    return `Public route`;
  }
}