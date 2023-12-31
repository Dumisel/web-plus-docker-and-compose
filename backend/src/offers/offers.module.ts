import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesModule } from 'src/wishes/wishes.module';
import { Offer } from './entities/offer.entity';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [TypeOrmModule.forFeature([Offer, Wish]), WishesModule],
  exports: [OffersService],
})
export class OffersModule {}
