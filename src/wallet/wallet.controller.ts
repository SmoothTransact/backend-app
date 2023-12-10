import { Controller } from '@nestjs/common';

@Controller('wallet')
export class WalletController {}

// // paystack/paystack.controller.ts
// import { Controller, Post, Body } from '@nestjs/common';
// import { PaystackService } from './paystack.service';

// @Controller('paystack')
// export class PaystackController {
//   constructor(private readonly paystackService: PaystackService) {}

//   @Post('initiate-payment')
//   async initiatePayment(
//     @Body() body: { email: string; amount: number },
//   ): Promise<any> {
//     try {
//       const paymentLink = await this.paystackService.initiatePayment(
//         body.email,
//         body.amount,
//       );
//       return { paymentLink };
//     } catch (error) {
//       console.error(error);
//       return { error: 'Failed to initiate payment' };
//     }
//   }

//   @Post('verify-payment')
//   async verifyPayment(@Body() body: { reference: string }): Promise<any> {
//     try {
//       const paymentDetails = await this.paystackService.verifyPayment(
//         body.reference,
//       );
//       return { paymentDetails };
//     } catch (error) {
//       console.error(error);
//       return { error: 'Failed to verify payment' };
//     }
//   }
// }
