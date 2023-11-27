// invoices/invoices.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/invoice.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createInvoice(
    @Req() req: Request,
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<any> {
    try {
      const userId = (req.user as any).user.id;
      const createdInvoice = await this.invoiceService.createInvoice(
        createInvoiceDto,
        userId,
      );
      return createdInvoice;
    } catch (error) {
      throw new NotFoundException('Failed to create invoice');
    }
  }

  @Get(':id')
  async getInvoiceDetails(@Param('id') id: string): Promise<any> {
    try {
      const invoiceDetails = await this.invoiceService.getInvoiceDetails(id);
      return invoiceDetails;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to fetch invoice details');
    }
  }
}
