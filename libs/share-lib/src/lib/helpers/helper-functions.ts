import { v4 as uuidv4 } from 'uuid';

export const isBotUser = (userId: string) => {
  return userId.includes('bot');
};

export const uuid = () => {
  return uuidv4();
};

export const waitFor = async (sec = 0) => {
  return await new Promise(resolve => setTimeout(resolve, sec));
};
