import { Module } from '@nestjs/common';
import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard } from 'nest-keycloak-connect';
import { ConfigService } from '../config/config.service';
import { APP_GUARD } from '@nestjs/core';

let configService = new ConfigService();

let options = {
  authServerUrl: configService.get('KEYCLOAK_HOST'),
  realm: configService.get('KEYCLOAK_REALM'),
  clientId: configService.get('KEYCLOAK_CLIENT_ID'),
  secret: configService.get('KEYCLOAK_CLIENT_SECRET'),
  // optional if you want to retrieve JWT from cookie
  // cookieKey: 'KEYCLOAK_JWT',
}

@Module({
  imports: [
    KeycloakConnectModule.register(options),
  ],
  providers: [
    // This adds a global level authentication guard, you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class KeycloakModule { }
