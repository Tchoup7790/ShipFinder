import { Module } from '@nestjs/common';
import { ShippingModule } from './modules/shipping/shipping.module';

@Module({
  imports: [ShippingModule],
})
export class AppModule {}
