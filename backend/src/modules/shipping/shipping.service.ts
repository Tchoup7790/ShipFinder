import { Injectable } from '@nestjs/common';
import { Countries } from './utils/countries';
import { Carriers } from './utils/carriers';

@Injectable()
export class ShippingService {
  calculateOffers(query: any) {
    const { weight, length, width, height, country, type } = query;
    const offers = [];
    const usedCarriers: Set<string> = new Set();

    for (let i = 0; i < 8; i++) {
      const offer = this.makeFakeOffer(
        weight,
        length,
        width,
        height,
        country,
        type,
      );
      if (!type || offer.type === type) {
        offers.push(offer);
      }
    }

    const expressOffers = offers.filter((o) => o.type === 'Express');
    const economicOffers = offers.filter((o) => o.type === 'Economique');

    expressOffers.sort((a, b) => a.price - b.price);
    economicOffers.sort((a, b) => a.price - b.price);

    const bestOffers = [];

    if (!type || type === 'Express') {
      const bestExpress = this.selectBestOfferWithDifferentCarrier(
        expressOffers,
        usedCarriers,
      );
      if (bestExpress) bestOffers.push(bestExpress);
    }

    if (!type || type === 'Economique') {
      const bestEconomic = this.selectBestOfferWithDifferentCarrier(
        economicOffers,
        usedCarriers,
      );
      if (bestEconomic) bestOffers.push(bestEconomic);
    }

    return { offers: bestOffers };
  }

  private selectBestOfferWithDifferentCarrier(
    offers: any[],
    usedCarriers: Set<string>,
  ) {
    for (const offer of offers) {
      if (!usedCarriers.has(offer.carrier)) {
        usedCarriers.add(offer.carrier);
        return offer;
      }
    }
    return null;
  }

  getCountries() {
    return Countries;
  }

  getCarriers() {
    return Carriers;
  }

  private getWeightFactor(weight: number): number {
    if (weight <= 250) return 10;
    if (weight <= 500) return 50;
    if (weight <= 1000) return 115;
    if (weight <= 2000) return 140;
    return 190;
  }

  private getCountryFactor(country: string): number {
    const distanceFactors = {
      France: 1,
      Belgique: 2,
      'Royaume-Uni': 3,
      Canada: 6,
      USA: 6,
    };
    return distanceFactors[country] || 1;
  }
  private makeFakeOffer(
    weight: number,
    length: number,
    width: number,
    height: number,
    country: string,
    type?: 'Express' | 'Economique',
  ) {
    const randomCarrier = Carriers[Math.floor(Math.random() * Carriers.length)];
    const countryFactor = this.getCountryFactor(country);
    const weightFactor = this.getWeightFactor(weight);

    const volumetricWeight = (length * width * height) / 5000;
    const effectiveWeight = volumetricWeight * weightFactor;

    const baseGrPrice = {
      Express: 0.015,
      Economique: 0.005,
    };

    const baseDeliveryTime = {
      Express: {
        min: 0,
        max: 3,
      },
      Economique: {
        min: 4,
        max: 10,
      },
    };

    const isExpress = type ? type === 'Express' : Math.random() > 0.5;
    const shipmentType = isExpress ? 'Express' : 'Economique';

    let price = effectiveWeight * baseGrPrice[shipmentType];
    price *= countryFactor;
    price *= 10;

    const variation = 0.9 + Math.random() * 0.2;
    price *= variation;

    const minTime = baseDeliveryTime[shipmentType].min * countryFactor;
    const maxTime = baseDeliveryTime[shipmentType].max * countryFactor;
    const deliveryTime = Math.round(
      minTime + Math.random() * (maxTime - minTime),
    );

    return {
      carrier: randomCarrier,
      country: country,
      price: Math.round(price * 100) / 10,
      deliveryTime: deliveryTime,
      type: shipmentType,
    };
  }
}
