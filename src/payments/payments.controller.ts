import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment Successful',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      ok: false,
      message: 'Payment Cancelled',
    };
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('escuchando');
    return this.paymentsService.stripeWebhook(req, res);
  }
}
