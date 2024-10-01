import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: ' ',
  baseURL: 'https://api.pawan.krd/cosmosrp/v1',
});

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({ data: createMessageDto });
  }

  findAll() {
    return this.prisma.message.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async getAI(contexMessageDto: CreateMessageDto) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: contexMessageDto.text }],
        model: 'cosmosrp',
      });
      const data = {
        text: chatCompletion.choices[0].message.content,
        author: 'bot',
      } as CreateMessageDto;
      return this.prisma.message.create({ data: data });
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: number) {
    return this.prisma.message.delete({ where: { id } });
  }
}
