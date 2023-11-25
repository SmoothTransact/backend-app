// mailgun.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as FormData from 'form-data';
import * as Mailgen from 'mailgen';

@Injectable()
export class MailgunService {
  private readonly apiKey: string;
  private readonly domain: string;

  constructor(private configService: ConfigService) {
    this.apiKey = configService.get<string>('mailgun_api_key');
    this.domain = configService.get<string>('mailgun_domain');
  }

  async sendWelcomeEmail(to: string, username: string) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Smooth Transact',
        link: 'https://smooth-transact.vercel.app',
        logo: 'https://github.com/ayobamy/chatbot-api/assets/59466195/fe4794a6-c205-4262-84b7-314410ca747a',
      },
    });

    const emailContent = {
      body: {
        name: username,
        intro: 'Welcome to Smooth Transact!',
        action: {
          instructions: 'To get started, Sign in to your Account',
          button: {
            color: '#0096FF',
            text: 'Sign in',
            link: 'https://smooth-transact.vercel.app/auth/login',
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailHtml = mailGenerator.generate(emailContent);

    const formData = new FormData();
    formData.append(
      'from',
      'Ahmed from Smooth Transact <contact@ahmedolawale.me>',
    );
    formData.append('to', to);
    formData.append('subject', 'Welcome to Smooth Transact');
    formData.append('html', emailHtml);

    const response = await axios.post(
      `https://api.mailgun.net/v3/${this.domain}/messages`,
      formData,
      {
        auth: {
          username: 'api',
          password: this.apiKey,
        },
        headers: formData.getHeaders(),
      },
    );

    return response.data;
  }

  async sendPasswordResetEmail(to: string, username: string, otp: string) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Smooth Transact',
        link: 'https://smooth-transact.vercel.app',
        logo: 'https://github.com/ayobamy/chatbot-api/assets/59466195/fe4794a6-c205-4262-84b7-314410ca747a',
      },
    });

    const emailContent = {
      body: {
        name: username,
        intro:
          'You have received this email because a password reset request for your account was received.',
        action: {
          instructions: 'Enter the OTP below to reset your password:',
          button: {
            color: '#0096FF',
            text: otp,
            link: '',
          },
        },
        outro:
          'If you did not request a password reset, no further action is required on your part.',
      },
    };

    const emailHtml = mailGenerator.generate(emailContent);

    const formData = new FormData();
    formData.append(
      'from',
      'Ahmed from Smooth Transact <contact@ahmedolawale.me>',
    );
    formData.append('to', to);
    formData.append('subject', 'Password Reset Request from Smooth Transact');
    formData.append('html', emailHtml);

    const response = await axios.post(
      `https://api.mailgun.net/v3/${this.domain}/messages`,
      formData,
      {
        auth: {
          username: 'api',
          password: this.apiKey,
        },
        headers: formData.getHeaders(),
      },
    );

    return response.data;
  }
}
