import { Controller, Get, Param,Logger } from '@nestjs/common';
import axios from 'axios';

const logger = new Logger('ForecastController');



@Controller('weatherForecast')
export class ForecastController {
  @Get(':city')
  async getWeather(@Param('city') city: string): Promise<any> {
    let apiUrl: string; 
    try {
      logger.log('Received request for city:', city);
      logger.log('API Key:', process.env.API_KEY);

      const apiKey = process.env.API_KEY;
      const limit=1;
      const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;
      logger.log('API URL:', apiUrl);
      const response = await axios.get(apiUrl);
      logger.log('API Response:', response.data);
     
      const selectedCity = response.data[0]; // Select the first city
      const lat = selectedCity.lat;
      const lon = selectedCity.lon;
      logger.log('Latitude:', lat);
      logger.log('Longitude:', lon);
      const apiUrl2=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const response2=await axios.get(apiUrl2);
      return response2.data;
   

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
