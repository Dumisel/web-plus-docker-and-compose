import {
  IsString,
  Length,
  IsUrl,
  IsNotEmpty,
  IsArray,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateWishlistDto {
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
