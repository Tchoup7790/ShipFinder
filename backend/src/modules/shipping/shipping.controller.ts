import { Controller, Get, Body, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { OfferDto } from './dto/offer.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('offers')
  async getOffers(@Body() body: OfferDto) {
    return this.shippingService.calculateOffers(body);
  }

  @Get('carriers')
  getCarriers() {
    return this.shippingService.getCarriers();
  }

  @Get('countries')
  getCountries() {
    return this.shippingService.getCountries();
  }
}
