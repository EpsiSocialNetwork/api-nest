import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('public', () => {
    it('should return "Public route"', () => {
      expect(appController.public()).toBe('Public route');
    });
  });

  describe('new', () => {
    it('should return "Hello you re log"', () => {
      expect(appController.newUrl()).toBe(`Hello you're log`);
    });
  });
});
