import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  KEYCLOAK_REALM: string;
  private readonly envConfig: { [key: string]: string };

  constructor() {
    if (
      process.env.NODE_ENV === 'prod' ||
      process.env.NODE_ENV === 'dev'
    ) {
      this.envConfig = {
        KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
      };
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}