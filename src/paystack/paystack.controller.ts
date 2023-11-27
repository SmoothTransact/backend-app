import { Controller, Get, Param } from '@nestjs/common';
import { PaystackService } from './paystack.service';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Get('initiate-payment')
  async initiatePayment(email: string, amount: number): Promise<any> {
    const result = await this.paystackService.initiatePayment(email, amount);
    return result;
  }

  @Get('verify/:reference')
  async verifyPayment(@Param('reference') reference: string): Promise<any> {
    try {
      const verificationResult =
        await this.paystackService.processPaymentVerification(reference);

      return {
        message: 'Payment verification successful',
        data: verificationResult,
      };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to verify payment' };
    }
  }
}
