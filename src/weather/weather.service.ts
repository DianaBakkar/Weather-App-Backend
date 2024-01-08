import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherData } from 'src/entities/weather-data.entity'; 

@Injectable()
export class WeatherService {
    constructor(
        @InjectRepository(WeatherData)
        private readonly weatherDataRepository: Repository<WeatherData>,
    ) {}

    async saveWeatherData(weatherData: WeatherData): Promise<WeatherData> {
        return await this.weatherDataRepository.save(weatherData);
    }
}
