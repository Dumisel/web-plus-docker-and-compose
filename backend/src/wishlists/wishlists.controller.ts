import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistsService.create(req.user.id, createWishlistDto);
  }

  @Get()
  async findAll() {
    return await this.wishlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.wishlistsService.findById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return await this.wishlistsService.update(
      +id,
      req.user.id,
      updateWishlistDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return await this.wishlistsService.remove(+id, +req.user.id);
  }
}
