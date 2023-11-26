// mailgun.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as Mailgen from 'mailgen';

@Injectable()
export class MailgunService {
  private readonly user: string;
  private readonly pass: string;

  constructor(private configService: ConfigService) {
    // this.apiKey = configService.get<string>('mailgun_api_key');
    this.user = configService.get<string>('mailgun_user');
    this.pass = configService.get<string>('mailgun_password');
  }

  async sendWelcomeEmail(to: string, username: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });

    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Smooth Transact',
        link: 'https://smooth-transact.netlify.app',
        logo: './../src/mailgun/assets/Logo.png',
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
            link: 'https://smooth-transact.netlify.app/auth/login',
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailHtml = mailGenerator.generate(emailContent);

    const mailOptions = {
      from: 'Ahmed from Smooth Transact <contact@ahmedolawale.me>',
      to: to,
      subject: 'Welcome to Smooth Transact',
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    return info.response;
  }

  async sendPasswordResetEmail(to: string, username: string, otp: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });

    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Smooth Transact',
        link: 'https://smooth-transact.netlify.app',
        logo: '../../src/mailgun/assets/Logo.png',
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

    const mailOptions = {
      from: 'Ahmed from Smooth Transact <contact@ahmedolawale.me>',
      to: to,
      subject: 'Password Reset Request from Smooth Transact',
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    return info.response;
  }
}
