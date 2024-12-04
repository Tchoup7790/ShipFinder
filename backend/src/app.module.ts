import { Module } from '@nestjs/common';
import { ShippingModule } from './modules/shipping/shipping.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ShippingModule],
})
export class AppModule {}
