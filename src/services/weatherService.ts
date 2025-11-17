import axios from 'axios'
import { WeatherData, ForecastData, LocationData } from '../types/weather'

// You'll need to get your own API key from OpenWeatherMap
const API_KEY = 'YOUR_OPENWEATHER_API_KEY'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
})

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await api.get('/weather', {
        params: { q: city }
      })
      
      return this.transformCurrentWeather(response.data)
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw new Error('Failed to fetch current weather')
    }
  },

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await api.get('/weather', {
        params: { lat, lon }
      })
      
      return this.transformCurrentWeather(response.data)
    } catch (error) {
      console.error('Error fetching current weather by coords:', error)
      throw new Error('Failed to fetch current weather')
    }
  },

  async getForecast(city: string): Promise<ForecastData[]> {
    try {
      const response = await api.get('/forecast', {
        params: { q: city }
      })
      
      return this.transformForecast(response.data.list)
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw new Error('Failed to fetch forecast')
    }
  },

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastData[]> {
    try {
      const response = await api.get('/forecast', {
        params: { lat, lon }
      })
      
      return this.transformForecast(response.data.list)
    } catch (error) {
      console.error('Error fetching forecast by coords:', error)
      throw new Error('Failed to fetch forecast')
    }
  },

  async getLocation(city: string): Promise<LocationData> {
    try {
      const response = await api.get('/weather', {
        params: { q: city }
      })
      
      return this.transformLocation(response.data)
    } catch (error) {
      console.error('Error fetching location:', error)
      throw new Error('Failed to fetch location')
    }
  },

  async getLocationByCoords(lat: number, lon: number): Promise<LocationData> {
    try {
      const response = await api.get('/weather', {
        params: { lat, lon }
      })
      
      return this.transformLocation(response.data)
    } catch (error) {
      console.error('Error fetching location by coords:', error)
      throw new Error('Failed to fetch location')
    }
  },

  transformCurrentWeather(data: any): WeatherData {
    return {
      id: data.weather[0].id,
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 0,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      cloudiness: data.clouds.all,
      timestamp: data.dt * 1000
    }
  },

  transformForecast(list: any[]): ForecastData[] {
    return list.slice(0, 8).map((item) => ({
      id: item.weather[0].id,
      date: new Date(item.dt * 1000).toLocaleDateString(),
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      main: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      precipitation: item.rain?.['3h'] || item.snow?.['3h'] || 0,
      precipitationProbability: item.pop * 100
    }))
  },

  transformLocation(data: any): LocationData {
    return {
      name: data.name,
      country: data.sys.country,
      state: data.state,
      lat: data.coord.lat,
      lon: data.coord.lon,
      timezone: data.timezone,
      timezoneOffset: data.timezone
    }
  }
}

// Mock data for development (remove when you have API key)
export const mockWeatherData: WeatherData = {
  id: 800,
  main: 'Clear',
  description: 'clear sky',
  icon: '01d',
  temperature: 22,
  feelsLike: 24,
  tempMin: 18,
  tempMax: 26,
  humidity: 65,
  pressure: 1013,
  visibility: 10,
  windSpeed: 3.5,
  windDirection: 180,
  cloudiness: 0,
  timestamp: Date.now()
}

export const mockForecastData: ForecastData[] = [
  {
    id: 800,
    date: new Date().toLocaleDateString(),
    time: '12:00',
    temperature: 22,
    tempMin: 18,
    tempMax: 26,
    main: 'Clear',
    description: 'clear sky',
    icon: '01d',
    humidity: 65,
    windSpeed: 3.5,
    precipitation: 0,
    precipitationProbability: 0
  },
  {
    id: 801,
    date: new Date(Date.now() + 86400000).toLocaleDateString(),
    time: '12:00',
    temperature: 20,
    tempMin: 16,
    tempMax: 24,
    main: 'Clouds',
    description: 'few clouds',
    icon: '02d',
    humidity: 70,
    windSpeed: 4.2,
    precipitation: 0,
    precipitationProbability: 10
  }
]
