import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import {
  Length,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsOptional()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  //wishes
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  // offers
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  // wishlists
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
