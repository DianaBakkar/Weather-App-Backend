
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherData } from 'src/entities/weather-data.entity';

@Injectable()
export class ForecastService {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherDataRepository: Repository<WeatherData>,
  ) {}

  async saveForecastData(weatherData: WeatherData): Promise<WeatherData> {
    return await this.weatherDataRepository.save(weatherData);
  }

  async getWeatherDataByTimestamp(timestamp: Date): Promise<WeatherData | undefined> {
    return await this.weatherDataRepository.findOne({
      where: { timestamp: timestamp },
    });
  }
  
}
