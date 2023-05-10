import { Test } from '@nestjs/testing';
import { BeChatService } from './be-chat.service';

describe('ChatService', () => {
  let service: BeChatService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BeChatService]
    }).compile();

    service = app.get<BeChatService>(BeChatService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
