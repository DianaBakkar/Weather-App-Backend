// src/weather/weather.module.ts

import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';

@Module({
  controllers: [WeatherController],
})
export class WeatherModule {}
