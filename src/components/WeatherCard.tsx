import { motion } from 'framer-motion'
import { useWeather } from '../contexts/WeatherContext'
import { mockWeatherData } from '../services/weatherService'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  CloudSnow
} from 'lucide-react'

export default function WeatherCard() {
  const { currentWeather, loading } = useWeather()
  
  // Use mock data for development
  const weather = currentWeather || mockWeatherData

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-500" />
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-500" />
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-500" />
      case 'snow':
        return <Snowflake className="w-16 h-16 text-blue-300" />
      default:
        return <Cloud className="w-16 h-16 text-gray-500" />
    }
  }

  const getBackgroundGradient = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return 'from-yellow-400 to-orange-500'
      case 'clouds':
        return 'from-gray-400 to-gray-600'
      case 'rain':
        return 'from-blue-500 to-blue-700'
      case 'snow':
        return 'from-gray-200 to-gray-400'
      default:
        return 'from-blue-400 to-blue-600'
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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Weather Header */}
      <div className={`bg-gradient-to-r ${getBackgroundGradient(weather.main)} p-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold capitalize">{weather.description}</h2>
            <p className="text-white/80">Current Weather</p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {getWeatherIcon(weather.main)}
          </motion.div>
        </div>
      </div>

      {/* Temperature Display */}
      <div className="p-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {weather.temperature}°
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">
            Feels like {weather.feelsLike}°
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>H: {weather.tempMax}°</span>
            <span>L: {weather.tempMin}°</span>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"
          >
            <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{weather.humidity}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"
          >
            <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{weather.windSpeed} m/s</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"
          >
            <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{weather.visibility} km</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"
          >
            <Gauge className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{weather.pressure} hPa</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
