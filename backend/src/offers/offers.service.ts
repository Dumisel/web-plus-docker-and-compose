import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    const { itemId, amount, hidden } = createOfferDto;
    const wish = await this.wishesService.findWish(itemId);

    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'Нельзя участвовать в сборе на свои подарки',
      );
    } else if (amount + wish.raised > wish.price) {
      throw new BadRequestException('Сумма превышает стоимость подарка');
    }

    const newOffer = await this.offersRepository.create({
      amount,
      hidden,
      item: wish,
      user,
    });

    await this.wishesService.updateRaised(wish, amount);
    await this.offersRepository.save(newOffer);
    return newOffer;
  }

  async findAll() {
    return await this.offersRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
  }

  async findById(id: number) {
    return this.offersRepository.findOne({
      where: { id },
      relations: {
        user: true,
        item: true,
      },
    });
  }

  async remove(id: number) {
    await this.offersRepository.delete(id);
  }
}
