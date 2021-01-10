import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';
// Modules
import { KeycloakModule } from './auth/keycloak.module';
import { AppController } from './app.controller';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot(),
    // All routes are controled by Keycloak
    KeycloakModule,
    PostModule,
    CommentModule,
    TagModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
