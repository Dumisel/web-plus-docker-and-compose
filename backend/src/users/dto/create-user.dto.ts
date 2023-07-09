import {
  IsEmail,
  Length,
  MinLength,
  IsUrl,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @Length(2, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
