// invoices/invoices.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  UseGuards,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/invoice.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Invoice } from './entities/invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':clientId')
  async createInvoice(
    @Req() req: Request,
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Param('clientId') clientId: string,
  ): Promise<any> {
    try {
      const userId = (req.user as any).user.id;

      const createdInvoice = await this.invoiceService.createInvoice(
        createInvoiceDto,
        userId,
        clientId,
      );

      // Generate Paystack link after creating the invoice
      const paymentLink = await this.invoiceService.generatePaystackLink(
        createdInvoice.invoice.id,
      );

      // You can now send the paymentLink to the client
      return { invoice: createdInvoice, paymentLink };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to create invoice');
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async markInvoiceAsPaid(
    @Param('id') id: string,
  ): Promise<{ invoice: Invoice; paymentStatus: string }> {
    try {
      const paymentDetails = await this.invoiceService.markInvoiceAsPaid(id);

      return {
        invoice: paymentDetails.invoice,
        paymentStatus: 'success',
      };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Failed to mark invoice as paid');
    }
  }
}
