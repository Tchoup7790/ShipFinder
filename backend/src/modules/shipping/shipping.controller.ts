import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { OfferQueryDto } from './dto/offer-query.dto';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('offers')
  getOffersQuery(@Query() query: OfferQueryDto) {
    return this.shippingService.calculateOffers(query);
  }

  @Post('offers')
  async getOffers(@Body() body: any) {
    console.log('body', body);
    return {
      offers: [
        {
          carrier: 'UPS',
          price: 10,
          deliveryTime: 2,
        },
        {
          carrier: 'FedEx',
          price: 15,
          deliveryTime: 3,
        },
      ],
    };
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
