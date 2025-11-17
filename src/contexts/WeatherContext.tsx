import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { WeatherData, ForecastData, LocationData } from '../types/weather'
import { weatherService } from '../services/weatherService'

interface WeatherState {
  currentWeather: WeatherData | null
  forecast: ForecastData[]
  location: LocationData | null
  loading: boolean
  error: string | null
  favorites: string[]
}

type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_WEATHER'; payload: WeatherData }
  | { type: 'SET_FORECAST'; payload: ForecastData[] }
  | { type: 'SET_LOCATION'; payload: LocationData }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'SET_FAVORITES'; payload: string[] }

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  location: null,
  loading: false,
  error: null,
  favorites: []
}

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload, loading: false, error: null }
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload }
    case 'SET_LOCATION':
      return { ...state, location: action.payload }
    case 'ADD_FAVORITE':
      const newFavorites = [...state.favorites, action.payload]
      localStorage.setItem('weather-favorites', JSON.stringify(newFavorites))
      return { ...state, favorites: newFavorites }
    case 'REMOVE_FAVORITE':
      const filteredFavorites = state.favorites.filter(fav => fav !== action.payload)
      localStorage.setItem('weather-favorites', JSON.stringify(filteredFavorites))
      return { ...state, favorites: filteredFavorites }
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload }
    default:
      return state
  }
}

interface WeatherContextType extends WeatherState {
  fetchWeather: (city: string) => Promise<void>
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>
  addToFavorites: (city: string) => void
  removeFromFavorites: (city: string) => void
  isFavorite: (city: string) => boolean
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('weather-favorites')
    if (savedFavorites) {
      dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(savedFavorites) })
    }

    // Get user's location and fetch weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
        },
        () => {
          // Fallback to default location (London)
          fetchWeather('London')
        }
      )
    } else {
      fetchWeather('London')
    }
  }, [])

  const fetchWeather = async (city: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      const [currentWeather, forecast, location] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city),
        weatherService.getLocation(city)
      ])

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: currentWeather })
      dispatch({ type: 'SET_FORECAST', payload: forecast })
      dispatch({ type: 'SET_LOCATION', payload: location })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch weather data' })
    }
  }

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      const [currentWeather, forecast, location] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(lat, lon),
        weatherService.getForecastByCoords(lat, lon),
        weatherService.getLocationByCoords(lat, lon)
      ])

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: currentWeather })
      dispatch({ type: 'SET_FORECAST', payload: forecast })
      dispatch({ type: 'SET_LOCATION', payload: location })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch weather data' })
    }
  }

  const addToFavorites = (city: string) => {
    if (!state.favorites.includes(city)) {
      dispatch({ type: 'ADD_FAVORITE', payload: city })
    }
  }

  const removeFromFavorites = (city: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: city })
  }

  const isFavorite = (city: string) => {
    return state.favorites.includes(city)
  }

  const value: WeatherContextType = {
    ...state,
    fetchWeather,
    fetchWeatherByCoords,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}
