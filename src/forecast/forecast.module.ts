import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service'; 
import { WeatherData } from 'src/entities/weather-data.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([WeatherData])],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
