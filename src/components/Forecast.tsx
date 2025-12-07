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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">5-Day Forecast</h3>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span className="hidden sm:inline">Next 5 days</span>
          <span className="sm:hidden">5 days</span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {forecastData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors gap-3 sm:gap-0"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              <div className="text-center min-w-[50px] sm:min-w-[60px]">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 hidden sm:block">
                  {day.time}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {day.date}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 sm:flex-initial">
                <div className="flex-shrink-0">{getWeatherIcon(day.main)}</div>
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white capitalize truncate sm:whitespace-normal">
                    {day.description}
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3 flex-shrink-0" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wind className="w-3 h-3 flex-shrink-0" />
                      <span>{day.windSpeed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto flex sm:block items-center justify-between sm:justify-end">
              <div className="flex items-center space-x-2 sm:space-x-2">
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {day.temperature}°
                </span>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span className="sm:hidden">H: {day.tempMax}° / L: {day.tempMin}°</span>
                  <div className="hidden sm:block">
                    <div>H: {day.tempMax}°</div>
                    <div>L: {day.tempMin}°</div>
                  </div>
                </div>
              </div>
              {day.precipitationProbability > 0 && (
                <p className="text-xs text-blue-500 sm:mt-1">
                  {day.precipitationProbability}%
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
        className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Average Temperature</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {Math.round(forecastData.reduce((sum, day) => sum + day.temperature, 0) / forecastData.length)}°
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Rainy Days</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {forecastData.filter(day => day.precipitationProbability > 30).length}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
