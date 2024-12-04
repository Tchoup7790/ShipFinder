import { Controller, Get, Query } from '@nestjs/common';
import { OfferQueryDto } from './dto/offer-query.dto';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('offers')
  getOffers(@Query() query: OfferQueryDto) {
    return this.shippingService.calculateOffers(query);
  }
}
