import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MinLength, IsDefined, IsDateString } from 'class-validator';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ always: true })
  @MinLength(2, { always: true })
  code_produit: string;

  @Column()
  @IsString({ always: true })
  @MinLength(2, { always: true })
  famille_produit: string;

  @Column()
  @IsString({ always: true })
  @MinLength(2, { always: true })
  description_produit: string;

  @Column()
  quantite_min: number;

  @Column('float')
  packaging: number;

  @Column('float')
  prix: number;

  @Column({ default: 0 })
  stock_disponible: number;
}
