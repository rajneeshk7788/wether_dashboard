import { motion } from 'framer-motion'
import { useWeather } from '../contexts/WeatherContext'
import { MapPin, Layers, Thermometer, Droplets } from 'lucide-react'

export default function WeatherMap() {
  const { location, loading } = useWeather()

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
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Weather Map</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Location Marker */}
        {location && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-red-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </motion.div>
        )}

        {/* Map Overlay Info */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center space-x-1">
                  <Thermometer className="w-3 h-3 text-red-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Temperature</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">Precipitation</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Interactive map coming soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Current Location</span>
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
            Temperature
          </button>
          <button className="flex-1 sm:flex-initial px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
            Precipitation
          </button>
        </div>
      </div>

      {/* Map Features Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-medium">Map Features</p>
            <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <li>• Real-time weather overlay</li>
              <li>• Precipitation radar</li>
              <li>• Temperature heat map</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 font-medium">Coming Soon</p>
            <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <li>• Interactive zoom & pan</li>
              <li>• Multiple layer options</li>
              <li>• Weather animations</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
