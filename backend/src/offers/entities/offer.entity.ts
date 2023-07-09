import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsBoolean, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //user
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  //item
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
