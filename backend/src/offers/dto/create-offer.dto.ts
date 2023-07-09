import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
