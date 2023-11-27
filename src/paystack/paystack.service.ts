import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as https from 'https';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackService {
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.secretKey = configService.get<string>('secretKey');
  }

  private async makeRequest(
    options: https.RequestOptions,
    data?: any,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const paystackRequest = https.request(options, (paystackRes) => {
        let responseData = '';

        paystackRes.on('data', (chunk) => {
          responseData += chunk;
        });

        paystackRes.on('end', () => {
          try {
            const responseJson = JSON.parse(responseData);
            resolve(responseJson.data);
          } catch (error) {
            reject(
              new HttpException(
                'Invalid Paystack response',
                HttpStatus.BAD_REQUEST,
              ),
            );
          }
        });
      });

      paystackRequest.on('error', (error) => {
        reject(
          new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
        );
      });

      if (data) {
        paystackRequest.write(JSON.stringify(data));
      }

      paystackRequest.end();
    });
  }

  async initiatePayment(email: string, amount: number): Promise<any> {
    const data = { email, amount };

    const options: https.RequestOptions = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.secretKey,
      },
    };

    return this.makeRequest(options, data);
  }

  async verifyPayment(reference: string): Promise<any> {
    const options: https.RequestOptions = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${encodeURIComponent(reference)}`,
      method: 'GET',
      headers: {
        Authorization: this.secretKey,
      },
    };

    return this.makeRequest(options);
  }

  async processPaymentVerification(reference: string): Promise<any> {
    try {
      const paymentDetails = await this.verifyPayment(reference);

      if (paymentDetails.status === 'success') {
        return paymentDetails;
      } else {
        throw new HttpException(
          'Payment verification failed',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error verifying payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
