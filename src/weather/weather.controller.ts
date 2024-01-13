import { Controller, Get,UseGuards,Request, Param, Logger } from '@nestjs/common';
import { WeatherData } from 'src/entities/weather-data.entity'; 
import { WeatherService } from 'src/weather/weather.service';
import { JwtAuthGuard } from 'src/app/auth/jwt-auth.guard';
import axios from 'axios';

const logger = new Logger('WeatherController');

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    //@UseGuards(JwtAuthGuard)
    @Get('saved-locations/:userId')
    async getSavedLocationsForUser(@Param('userId') userId: number) {
      const savedLocations = await this.weatherService.getSavedLocationsForUser(userId);
      logger.log('Saved Locations:',savedLocations);
      return savedLocations;
      
    }

    @Get(':city')
    async getWeather(@Param('city') city: string): Promise<any> {
        try {
            logger.log('Received request for city:', city);
            logger.log('API Key:', process.env.API_KEY);

            const apiKey = process.env.API_KEY;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            logger.log('API URL:', apiUrl);
            const response = await axios.get(apiUrl);
            const weatherDataFromAPI = response.data;

            const newWeatherData = new WeatherData();
            newWeatherData.temperature = weatherDataFromAPI.main.temp || 0;
            newWeatherData.humidity = weatherDataFromAPI.main.humidity || 0;
            newWeatherData.wind_speed = weatherDataFromAPI.wind.speed || 0;
            newWeatherData.cloudiness = weatherDataFromAPI.clouds.all || 0;
            newWeatherData.rain_volume = weatherDataFromAPI.rain?.['1h'] || 0;
            newWeatherData.timestamp = new Date();

           
            const savedWeatherData = await this.weatherService.saveWeatherData(newWeatherData);

            return savedWeatherData;
        } catch (error) {
            logger.error('Error fetching weather data:', error);
            return { error: 'Failed to fetch weather data' };
        }


      
    }
}
