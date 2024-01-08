import { Controller, Get, Param,Logger } from '@nestjs/common';
import axios from 'axios';

const logger = new Logger('WeatherController');



@Controller('weather')
export class WeatherController {
  @Get(':city')
  async getWeather(@Param('city') city: string): Promise<any> {
    try {
      logger.log('Received request for city:', city);
      logger.log('API Key:', process.env.API_KEY);

      const apiKey = process.env.API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      logger.log('API URL:', apiUrl);
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      return weatherData;
    } catch (error) {
      logger.error('Error fetching weather data:', error);
      return { error: 'Failed to fetch weather data' };
    }
  }
}
