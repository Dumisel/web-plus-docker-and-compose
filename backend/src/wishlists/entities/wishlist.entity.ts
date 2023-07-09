import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import {
  Length,
  MaxLength,
  IsUrl,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  @MaxLength(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  // items
  @ManyToMany(() => Wish)
  items: Wish[];

  //owner
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
