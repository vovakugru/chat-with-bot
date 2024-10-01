import { Message } from '@prisma/client';

export class MessageEntity implements Message {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
}
