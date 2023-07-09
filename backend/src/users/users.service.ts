import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });
    try {
      const user = await this.usersRepository.save(newUser);
      delete user.password;
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Такой пользователь уже существует');
      } else {
        throw new InternalServerErrorException('500 Внутренняя ошибка сервера');
      }
    }
  }

  async findOne(query) {
    const user = await this.usersRepository.findOne(query);

    return user;
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Пользователь ${id} не найден`);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user)
      throw new NotFoundException(`Пользователь ${username} не найден`);

    return user;
  }

  async findMany(findUsersDto: FindUsersDto) {
    const { query } = findUsersDto;
    return await this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto = { ...updateUserDto, password: hash };
    }

    try {
      await this.usersRepository.update(id, updateUserDto);
      return this.findById(id);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Такой пользователь уже существует');
      } else {
        throw new InternalServerErrorException('500 Внутренняя ошибка сервера');
      }
    }
  }

  async getWishesById(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: {
        wishes: { owner: true, offers: true },
      },
    });

    return user.wishes;
  }

  async getWishesByUsername(username: string) {
    const user = await this.findOne({
      where: { username },
      relations: {
        wishes: { owner: true, offers: true },
      },
    });

    return user.wishes;
  }
}
