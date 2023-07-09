import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(id: number, createWishDto: CreateWishDto) {
    const { name, link, image, price, description } = createWishDto;
    const wish = this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      raised: 0,
      owner: { id },
      offers: [],
    });
    return await this.wishesRepository.save(wish);
  }

  async findWish(id: number) {
    return await this.wishesRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: { user: true },
      },
    });
  }

  async update(wishId: number, updateWishDto: UpdateWishDto, userId: number) {
    const wish = await this.findWish(wishId);
    if (userId !== wish.owner.id) {
      throw new ForbiddenException(
        'Нельзя изменять и удалять подарки других пользователей',
      );
    }
    if (updateWishDto.price && wish.raised > 0) {
      throw new BadRequestException(
        'Нельзя изменить стоимость подарка. Начался сбор средств',
      );
    }
    return await this.wishesRepository.update(wish, updateWishDto);
  }

  async remove(id: number, userId: number) {
    const wish = await this.wishesRepository.findOneBy({ id });

    if (userId !== wish.owner.id)
      throw new ForbiddenException(
        'Нельзя изменять и удалять подарки других пользователей',
      );

    return await this.wishesRepository.delete(id);
  }

  async copyWish(id: number, user: User) {
    const wish = await this.findWish(id);
    if (user.id === wish.owner.id)
      throw new ForbiddenException('Нельзя копировать свои подарки');

    const isDuplicate = await this.wishesRepository.findOne({
      where: {
        name: wish.name,
        link: wish.link,
        price: wish.price,
        owner: { id: user.id },
      },
      relations: { owner: true },
    });

    if (isDuplicate)
      throw new ForbiddenException('Вы уже копировали себе этот подарок');

    await this.wishesRepository.update(id, { copied: wish.copied + 1 });
    const { name, link, image, price, description } = wish;
    const copiedWish = await this.wishesRepository.create({
      name,
      link,
      image,
      price,
      description,
      raised: 0,
      owner: user,
    });

    return await this.wishesRepository.save(copiedWish);
  }

  getTopWishes() {
    return this.wishesRepository.find({
      order: { copied: 'DESC' },
      take: 10,
    });
  }

  getLastWishes() {
    return this.wishesRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  updateRaised(wish: Wish, amount: number) {
    return this.wishesRepository.update(
      { id: wish.id },
      { raised: wish.raised + amount },
    );
  }
}
