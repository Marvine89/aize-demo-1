import { Test } from '@nestjs/testing';
import { BeChatStoreService } from './be-chat-store.service';

describe('BeChatStoreService', () => {
  let service: BeChatStoreService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BeChatStoreService]
    }).compile();

    service = app.get<BeChatStoreService>(BeChatStoreService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
