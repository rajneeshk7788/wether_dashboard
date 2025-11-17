export interface WeatherData {
  id: number
  main: string
  description: string
  icon: string
  temperature: number
  feelsLike: number
  tempMin: number
  tempMax: number
  humidity: number
  pressure: number
  visibility: number
  windSpeed: number
  windDirection: number
  cloudiness: number
  uvIndex?: number
  airQuality?: {
    aqi: number
    pm25: number
    pm10: number
    o3: number
    no2: number
    so2: number
    co: number
  }
  timestamp: number
}

export interface ForecastData {
  id: number
  date: string
  time: string
  temperature: number
  tempMin: number
  tempMax: number
  main: string
  description: string
  icon: string
  humidity: number
  windSpeed: number
  precipitation: number
  precipitationProbability: number
}

export interface LocationData {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
  timezone: string
  timezoneOffset: number
}
export interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_API_KEY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface WeatherTheme {
  name: string
  gradient: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
}

export const WEATHER_THEMES: Record<string, WeatherTheme> = {
  sunny: {
    name: 'Sunny',
    gradient: 'from-yellow-400 to-orange-500',
    primaryColor: '#fbbf24',
    secondaryColor: '#f59e0b',
    textColor: '#92400e',
    backgroundColor: '#fef3c7'
  },
  cloudy: {
    name: 'Cloudy',
    gradient: 'from-gray-400 to-gray-600',
    primaryColor: '#9ca3af',
    secondaryColor: '#6b7280',
    textColor: '#374151',
    backgroundColor: '#f3f4f6'
  },
  rainy: {
    name: 'Rainy',
    gradient: 'from-blue-500 to-blue-700',
    primaryColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    textColor: '#1e40af',
    backgroundColor: '#dbeafe'
  },
  snowy: {
    name: 'Snowy',
    gradient: 'from-gray-200 to-gray-400',
    primaryColor: '#e5e7eb',
    secondaryColor: '#d1d5db',
    textColor: '#374151',
    backgroundColor: '#f9fafb'
  },
  stormy: {
    name: 'Stormy',
    gradient: 'from-gray-600 to-gray-800',
    primaryColor: '#6b7280',
    secondaryColor: '#374151',
    textColor: '#111827',
    backgroundColor: '#f3f4f6'
  }
}
