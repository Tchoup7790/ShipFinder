import { Injectable } from '@nestjs/common';
import { OfferQueryDto } from './dto/offer-query.dto';

@Injectable()
export class ShippingService {
  calculateOffers(query: OfferQueryDto) {
    const { weight, length, width, height, country } = query;
    const volumetricWeight = (length * width * height) / 5000;
    const economic = this.calculateEconomic(weight);
    const express = this.calculateExpress(volumetricWeight);

    return { economic, express };
  }

  getCountries() {
    return ['France', 'Canada', 'USA', 'Belgique', 'Royaume-Uni'];
  }

  getCarriers() {
    return ['FedEx', 'UPS', 'Colissimo', 'Chronopost'];
  }

  private calculateEconomic(weight: number) {
    return { type: 'economic', price: weight * 0.5 };
  }

  private calculateExpress(volumetricWeight: number) {
    return { type: 'express', price: volumetricWeight * 0.8 };
  }
}
