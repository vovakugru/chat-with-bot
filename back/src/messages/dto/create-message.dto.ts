import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  text: string;

  @IsString()
  @MaxLength(150)
  author: string;
}
