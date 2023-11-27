import { IsNumber, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(['paid', 'pending', 'due'])
  status: string;
}
