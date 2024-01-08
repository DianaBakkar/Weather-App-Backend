
import { Controller, Get, Param, Logger } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherData } from 'src/entities/weather-data.entity';

const logger = new Logger('ForecastController');

@Controller('weatherForecast')
export class ForecastController {
  constructor(
    @InjectRepository(WeatherData)
    private readonly weatherDataRepository: Repository<WeatherData>,
  ) {}

  @Get(':city')
  async getWeather(@Param('city') city: string): Promise<any> {
    let apiUrl: string;
    try {
      logger.log('Received request for city:', city);
      logger.log('API Key:', process.env.API_KEY);

      const apiKey = process.env.API_KEY;
      const limit = 1;

      // Fetch city data
      const cityResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`,
      );
      const selectedCity = cityResponse.data[0];
      const lat = selectedCity.lat;
      const lon = selectedCity.lon;
      logger.log('Latitude:', lat);
      logger.log('Longitude:', lon);

      // Fetch forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      );

      // Save forecast data
      const forecastData = forecastResponse.data.list;

      await Promise.all(
        forecastData.map(async (forecast) => {
          const weatherData = new WeatherData();
          weatherData.temperature = forecast.main.temp || 0;
          weatherData.humidity = forecast.main.humidity || 0;
          weatherData.wind_speed = forecast.wind.speed || 0;
          weatherData.cloudiness = forecast.clouds.all || 0;
          weatherData.rain_volume = forecast.rain?.['3h'] || 0;
          weatherData.timestamp = new Date(forecast.dt_txt);

          // Check if the data already exists in the database
          const existingData = await this.weatherDataRepository.findOne({
            where: { timestamp: weatherData.timestamp },
          });
          

          if (!existingData) {
            // Save data only if it doesn't exist
            await this.weatherDataRepository.save(weatherData);
          }
        }),
      );

      return forecastResponse.data;
    } catch (error) {
      logger.error('Error fetching forecast:', error.message);
      logger.error('Request details:', {
        method: 'GET',
        url: apiUrl,
        response: error.response?.data || 'No response data',
      });
      return { error: 'Failed to fetch forecast' };
    }
  }
}
