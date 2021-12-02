import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code_produit: string;

  @Column()
  famille_produit: string;

  @Column()
  description_produit: string;

  @Column()
  quantity_min: number;

  @Column('float')
  packaging: number;

  @Column('float')
  prix: number;

  @Column({default: 0})
  stock_disponible: number;  

}
