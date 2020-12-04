import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
const Strategy = require('passport-keycloak-bearer');

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      url: process.env.KEYCLOAK_HOST,
      realm: process.env.KEYCLOAK_REALM,
      loggingLevel: process.env.KEYCLOAK_LOGING_LEVEL,
      ignoreExpiration: process.env.KEYCLOAK_IGNORE_EXPIRATION,
      algorithms: process.env.KEYCLOAK_ALGORITHMS
    });
  }

  async validate(jwtPayload: any): Promise<any> {
    return jwtPayload;
  }
}