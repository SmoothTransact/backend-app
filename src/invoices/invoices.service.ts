import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dtos/invoice.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { PaystackService } from '../paystack/paystack.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    private readonly paystackService: PaystackService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionsService: TransactionsService,
  ) {}

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    userId: string,
  ): Promise<{ invoice: Invoice; paymentLink: string }> {
    const { description, amount } = createInvoiceDto;

    const newInvoice = this.invoiceRepository.create({
      description,
      amount,
      status: 'unpaid',
      user: { id: userId },
    });

    const savedInvoice = await this.invoiceRepository.save(newInvoice);

    // Create a transaction
    await this.transactionsService.createTransaction({
      invoiceId: savedInvoice.id,
      amount: savedInvoice.amount,
    });

    // Initiate payment and get the payment link
    const paymentLink = await this.paystackService.initiatePayment(
      savedInvoice.user.email,
      savedInvoice.amount,
    );

    return { invoice: savedInvoice, paymentLink };
  }

  async getInvoiceDetails(invoiceId: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
      relations: ['user'],
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async markInvoiceAsPaid(invoiceId: string): Promise<Invoice> {
    const invoice = await this.getInvoiceDetails(invoiceId);

    // Verify payment (You might want to implement this logic in PaystackService)
    const paymentDetails = await this.paystackService.verifyPayment(
      invoice.paymentReference,
    );

    if (paymentDetails.status === 'success') {
      invoice.status = 'paid';
      return await this.invoiceRepository.save(invoice);
    } else {
      throw new Error('Payment verification failed');
    }
  }
}
