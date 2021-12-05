import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column('float')
  prix: number;

}
