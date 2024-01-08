import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from 'src/weather//weather.service';
import { WeatherData } from 'src/entities/weather-data.entity'; 

@Module({
    imports: [TypeOrmModule.forFeature([WeatherData])],
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
