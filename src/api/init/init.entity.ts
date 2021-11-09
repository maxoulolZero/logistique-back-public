import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MinLength, IsDefined, IsDateString } from 'class-validator';

@Entity()
export class Init {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(2, { always: true })
  description: string;

  @Column()
  @IsDateString()
  @MinLength(3, { always: true })
  date_of_creation: string;

  @Column()
  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(3, { always: true })
  author: string;

  @Column()
  @IsString({ always: true })
  @MinLength(3, { always: true })
  date_of_edition: string;
}
