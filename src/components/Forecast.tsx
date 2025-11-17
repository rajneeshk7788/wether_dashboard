import { motion } from 'framer-motion'
import { useWeather } from '../contexts/WeatherContext'
import { mockForecastData } from '../services/weatherService'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Snowflake,
  Droplets,
  Wind
} from 'lucide-react'

export default function Forecast() {
  const { forecast, loading } = useWeather()
  
  // Use mock data for development
  const forecastData = forecast.length > 0 ? forecast : mockForecastData

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-500" />
      case 'clouds':
        return <Cloud className="w-6 h-6 text-gray-500" />
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />
      case 'snow':
        return <Snowflake className="w-6 h-6 text-blue-300" />
      default:
        return <Cloud className="w-6 h-6 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">5-Day Forecast</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Next 5 days</span>
        </div>
      </div>

      <div className="space-y-4">
        {forecastData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="text-center min-w-[60px]">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {day.time}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {getWeatherIcon(day.main)}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {day.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wind className="w-3 h-3" />
                      <span>{day.windSpeed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {day.temperature}°
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div>H: {day.tempMax}°</div>
                  <div>L: {day.tempMin}°</div>
                </div>
              </div>
              {day.precipitationProbability > 0 && (
                <p className="text-xs text-blue-500 mt-1">
                  {day.precipitationProbability}% chance
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Average Temperature</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {Math.round(forecastData.reduce((sum, day) => sum + day.temperature, 0) / forecastData.length)}°
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Rainy Days</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {forecastData.filter(day => day.precipitationProbability > 30).length}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
