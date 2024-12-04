import { Injectable } from '@nestjs/common';
import { Countries } from './utils/countries';
import { Carriers } from './utils/carriers';

@Injectable()
export class ShippingService {
  calculateOffers(query: any) {
    const { weight, length, width, height, country, type, carrier } = query;
    const offers = this.generateAllOffers(
      weight,
      length,
      width,
      height,
      country,
    );

    const filteredOffers = offers.filter(
      (offer) =>
        (!type || offer.type === type) &&
        (!carrier || offer.carrier === carrier),
    );

    const expressOffers = filteredOffers.filter((o) => o.type === 'Express');
    const economicOffers = filteredOffers.filter(
      (o) => o.type === 'Economique',
    );

    expressOffers.sort((a, b) => a.price - b.price);
    economicOffers.sort((a, b) => a.price - b.price);

    const bestOffers = [];

    if (type) {
      if (type === 'Express') {
        bestOffers.push(...expressOffers.slice(0, 2));
      } else if (type === 'Economique') {
        bestOffers.push(...economicOffers.slice(0, 2));
      }
    } else {
      if (expressOffers.length > 0) {
        bestOffers.push(expressOffers[0]);
      }
      if (economicOffers.length > 0) {
        bestOffers.push(economicOffers[0]);
      }
    }

    return { offers: bestOffers };
  }

  private generateAllOffers(
    weight: number,
    length: number,
    width: number,
    height: number,
    country: string,
  ) {
    const offers = [];

    Carriers.forEach((carrier) => {
      offers.push(
        this.makeFakeOffer(
          weight,
          length,
          width,
          height,
          country,
          'Express',
          carrier,
        ),
      );
      offers.push(
        this.makeFakeOffer(
          weight,
          length,
          width,
          height,
          country,
          'Economique',
          carrier,
        ),
      );
    });

    return offers;
  }

  private makeFakeOffer(
    weight: number,
    length: number,
    width: number,
    height: number,
    country: string,
    type: 'Express' | 'Economique',
    carrier: string,
  ) {
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

    let price = effectiveWeight * baseGrPrice[type];
    price *= countryFactor;
    price *= 10;

    const variation = 0.9 + Math.random() * 0.2;
    price *= variation;

    const minTime = baseDeliveryTime[type].min * countryFactor;
    const maxTime = baseDeliveryTime[type].max * countryFactor;
    const deliveryTime = Math.round(
      minTime + Math.random() * (maxTime - minTime),
    );

    return {
      carrier,
      country,
      price: Math.round(price * 100) / 10,
      deliveryTime,
      type,
    };
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

  getCountries() {
    return Countries;
  }

  getCarriers() {
    return Carriers;
  }
}
