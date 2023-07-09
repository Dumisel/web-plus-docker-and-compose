import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';
import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @IsNotEmpty()
  price: number;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  raised: number;
}
