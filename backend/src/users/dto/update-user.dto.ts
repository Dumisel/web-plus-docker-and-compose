import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  MinLength,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsString()
  @Length(2, 200)
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  password: string;
}
