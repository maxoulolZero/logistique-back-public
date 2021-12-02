export class CreateStockDto {
  code_produit: string;
  famille_produit: string;
  description_produit: string;
  quantity_min: number;
  packaging: number;
  prix: number;
  stock_disponible: number;  
}
