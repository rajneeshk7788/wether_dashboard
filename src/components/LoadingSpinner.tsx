import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react'

export default function LoadingSpinner() {
  const weatherIcons = [
    { icon: Sun, delay: 0 },
    { icon: Cloud, delay: 0.2 },
    { icon: CloudRain, delay: 0.4 },
    { icon: Snowflake, delay: 0.6 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Weather Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          {weatherIcons.map(({ icon: Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [20, -10, 20],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 text-blue-500"
            >
              <Icon className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Loading Weather Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching the latest weather data...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 w-64 mx-auto"
        >
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center space-x-1 mt-6"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
