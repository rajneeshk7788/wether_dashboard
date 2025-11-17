# 🌤️ Weather Dashboard

A beautiful, modern weather dashboard built with React, TypeScript, and Tailwind CSS. Features real-time weather data, interactive forecasts, and a clean, responsive design.

## ✨ Features

- 🌡️ **Real-time Weather Data** - Current conditions with detailed metrics
- 📊 **5-Day Forecast** - Extended weather predictions with hourly breakdowns
- 🗺️ **Interactive Maps** - Weather overlays and location tracking
- 🌙 **Dark/Light Mode** - Automatic theme switching with system preference
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Vite and modern React patterns
- 🎨 **Beautiful Animations** - Smooth transitions with Framer Motion
- 💾 **Offline Support** - Cached data and progressive web app features

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Charts**: Chart.js + React-ChartJS-2
- **Maps**: Leaflet + React-Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Setup  


1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add the key to your `.env.local` file

### Customization

- **Themes**: Modify `tailwind.config.js` for custom colors
- **Components**: All components are in `src/components/`
- **Styling**: Global styles in `src/index.css`
- **Types**: TypeScript definitions in `src/types/`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and search
│   ├── WeatherCard.tsx # Current weather display
│   ├── Forecast.tsx    # 5-day forecast
│   ├── WeatherMap.tsx  # Interactive map
│   └── ...
├── contexts/           # React contexts
│   ├── ThemeContext.tsx
│   └── WeatherContext.tsx
├── services/           # API services
│   └── weatherService.ts
├── types/              # TypeScript types
│   └── weather.ts
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🎨 Design Features

- **Modern UI**: Clean, minimalist design
- **Weather Themes**: Dynamic colors based on weather conditions
- **Smooth Animations**: Engaging micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation
- **Loading States**: Beautiful skeleton screens and spinners

## 📱 Mobile Features

- Touch gestures for navigation
- Pull-to-refresh functionality
- Optimized mobile layout
- Progressive Web App capabilities

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

### Other Platforms

The app can be deployed to any static hosting service that supports SPA routing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Happy Weather Tracking! 🌤️**
