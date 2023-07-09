import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  findLast() {
    return this.wishesService.getLastWishes();
  }

  @Get('top')
  findTop() {
    return this.wishesService.getTopWishes();
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user.id, createWishDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.wishesService.findWish(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return await this.wishesService.update(+id, updateWishDto, +req.user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return await this.wishesService.remove(+id, +req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Req() req, @Param('id') id: string) {
    return this.wishesService.copyWish(+id, req.user);
  }
}
