import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(id: number, createWishlistDto: CreateWishlistDto) {
    const { name, description, image, itemsId } = createWishlistDto;
    const items = itemsId.map((id) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      name,
      description,
      image,
      items,
      owner: { id },
    });
    return await this.wishlistsRepository.save(wishlist);
  }

  findAll() {
    return this.wishlistsRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findById(id: number) {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findOne(query) {
    return this.wishlistsRepository.findOne(query);
  }

  async update(
    id: number,
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (userId !== wishlist.owner.id) {
      throw new BadRequestException(
        'Нельзя изменять и удалять списки подарков других пользователей',
      );
    }
    return await this.wishlistsRepository.update(id, updateWishlistDto);
  }
  async remove(id: number, userId: number) {
    const wishlist = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (userId !== wishlist.owner.id) {
      throw new BadRequestException(
        'Нельзя изменять и удалять списки подарков других пользователей',
      );
    }
    await this.wishlistsRepository.delete(id);
  }
}
