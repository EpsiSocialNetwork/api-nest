import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard } from 'nest-keycloak-connect';

// Modules
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { KeycloakModule } from './auth/keycloak.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://localhost:8080/auth',
    //   realm: 'posthoop',
    //   clientId: 'myclient',
    //   secret: 'f9cc46c8-8be3-414f-b77d-163a7d24bfe0',
    //   // optional if you want to retrieve JWT from cookie
    //   // cookieKey: 'KEYCLOAK_JWT',
    // }),
    UserModule,
    PostModule,
    AuthModule
    ],
  controllers: [AppController],
  // providers: [
  //   // These are in order, see https://docs.nestjs.com/guards#binding-guards
  //   // for more information

  //   // This adds a global level authentication guard, you can also have it scoped
  //   // if you like.
  //   //
  //   // Will return a 401 unauthorized when it is unable to
  //   // verify the JWT token or Bearer header is missing.
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  //   // This adds a global level resource guard, which is permissive.
  //   // Only controllers annotated with @Resource and methods with @Scopes
  //   // are handled by this guard.
  //   {
  //     provide: APP_GUARD,
  //     useClass: ResourceGuard,
  //   },
  //   // New in 1.1.0
  //   // This adds a global level role guard, which is permissive.
  //   // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
  //   // specified role passed.
  //   {
  //     provide: APP_GUARD,
  //     useClass: RoleGuard,
  //   },
  // ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
