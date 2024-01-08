// src/app.module.ts

import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ForecastModule } from './forecast/forecast.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [WeatherModule,ForecastModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
