import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
  Req,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Req() req) {
    const user = await this.usersService.findById(req.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  @Patch('me')
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return user;
  }

  @Get('me/wishes')
  async findMyWishes(@Req() req) {
    return await this.usersService.getWishesById(req.user.id);
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return user;
  }

  @Get(':username/wishes')
  getUserWishesByUsername(@Param('username') username: string) {
    return this.usersService.getWishesByUsername(username);
  }

  @Post('find')
  findAll(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto);
  }
}
