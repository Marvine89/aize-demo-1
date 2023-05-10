import { IChatUser } from '@share-libs/interfaces';
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();

export const USERS: ReadonlyArray<IChatUser> = [
  {
    userId: 'bot-user-1',
    username: 'Patrick Sam',
    img: generator.generateRandomAvatar('PS'),
    socketId: '',
    responseTime: 3000
  },
  {
    userId: 'bot-user-2',
    username: 'Aurora Aksnes',
    img: generator.generateRandomAvatar('OG'),
    socketId: '',
    responseTime: 5000
  },
  {
    userId: 'bot-user-3',
    username: 'Ole Gunnar',
    img: generator.generateRandomAvatar('AA'),
    socketId: '',
    responseTime: 4000
  },
  {
    userId: 'bot-user-4',
    username: 'Lars Monsen',
    img: generator.generateRandomAvatar('L'),
    socketId: '',
    responseTime: 7000
  }
];
