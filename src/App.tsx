import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { WeatherProvider } from './contexts/WeatherContext'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import WeatherMap from './components/WeatherMap'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <WeatherProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            
            <main className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key="weather-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 sm:space-y-6 md:space-y-8"
                >
                  {/* Current Weather */}
                  <WeatherCard />
                  
                  {/* Forecast and Map Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <Forecast />
                    <WeatherMap />
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </WeatherProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
