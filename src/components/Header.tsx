import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Heart, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, type Theme } from '../contexts/ThemeContext'
import { useWeather } from '../contexts/WeatherContext'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { location, fetchWeather, isFavorite, addToFavorites, removeFromFavorites } = useWeather()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      await fetchWeather(searchQuery.trim())
      setSearchQuery('')
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const toggleFavorite = () => {
    if (location) {
      const cityName = `${location.name}, ${location.country}`
      if (isFavorite(cityName)) {
        removeFromFavorites(cityName)
      } else {
        addToFavorites(cityName)
      }
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Weather Dashboard</h1>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="flex-1 max-w-md mx-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
                disabled={isSearching}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </motion.form>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            {/* Current Location */}
            {location && (
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mr-4">
                <MapPin className="w-4 h-4" />
                <span>{location.name}, {location.country}</span>
              </div>
            )}

            {/* Favorite Button */}
            {location && (
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite(`${location.name}, ${location.country}`)
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite(`${location.name}, ${location.country}`) ? 'fill-current' : ''}`} />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={`Current theme: ${theme}`}
            >
              {getThemeIcon()}
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
