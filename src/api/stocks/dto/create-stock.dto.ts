import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStockDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber({
    allowNaN: false
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
  })
  prix: number;
}
