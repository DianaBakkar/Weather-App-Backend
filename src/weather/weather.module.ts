import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from 'src/weather//weather.service';
import { WeatherData } from 'src/entities/weather-data.entity'; 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocationRepository } from 'src/repositories/location.repository';

@Module({
    imports: [TypeOrmModule.forFeature([WeatherData])],
    controllers: [WeatherController],
    providers: [WeatherService,JwtAuthGuard,LocationRepository],
})
export class WeatherModule {}
