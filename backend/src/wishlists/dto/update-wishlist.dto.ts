import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlist.dto';
import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsArray,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(1500)
  description: string;

  @IsUrl()
  image: string;

  @IsArray()
  itemsId: number[];
}
