import { Test } from '@nestjs/testing';
import { BeUserLibService } from './be-user-lib.service';

describe('BeUserLibService', () => {
  let service: BeUserLibService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BeUserLibService]
    }).compile();

    service = app.get<BeUserLibService>(BeUserLibService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
