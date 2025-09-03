import { CompletionEngine } from './src/completion/completion-engine.js';

interface CursorPosition {
  line: number;
  column: number;
}

async function apiExample(): Promise<void> {
  const engine = new CompletionEngine();

  // Example showing API call completion
  const code: string = `// API service for weather data
class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  // Fetch current weather for a city
  async getCurrentWeather(city) {
    try {
      const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${this.apiKey}&units=metric\`
      );
      
      if (!response.ok) {
        throw new Error(\`Weather API error: \${response.status}\`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: {
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Fetch 5-day forecast
  async getForecast(city) {
    try {
      const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/forecast?q=\${city}&appid=\${this.apiKey}&units=metric\`
      );
      
      if (!response.ok) {
        throw new Error(\`Forecast API error: \${response.status}\`);
      }
      
      const data = await response.json();
      
      // Process forecast data
      const forecast = data.list.map(item => ({
        datetime: new Date(item.dt * 1000),
        temperature: item.main.temp,
        description: item.weather[0].description,
        humidity: item.main.humidity
      }));
      
      return {
        success: true,
        data: {
          city: data.city.name,
          country: data.city.country,
          forecast: forecast
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Usage in an Express.js route
const express = require('express');
const router = express.Router();
const weatherService = new WeatherService(process.env.WEATHER_API_KEY);

router.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  
  // Get current weather
  const weatherResult = await weatherService.getCurrentWeather(city);
  
  if (!weatherResult.success) {
    return res.status(500).json({
      success: false,
      error: weatherResult.error
    });
  }
  
  // Get 5-day forecast
  const forecastResult = await weatherService.getForecast(city);
  
  if (!forecastResult.success) {
    return res.status(500).json({
      success: false,
      error: forecastResult.error
    });
  }
  
  // Combine results and send response
  res.json({
    success: true,
    data: {
      current: weatherResult.data,
      forecast: forecastResult.data.forecast
    }
  });
  
  // Log the request for analytics
  // Cursor position is here - let's get AI completion for logging
`;

  // Position cursor at the end where we want completion
  const cursorPosition: CursorPosition = { line: 98, column: 0 };

  console.log('🚀 API Context AI Completion Example');
  console.log('====================================\n');
  
  console.log('Code context:');
  console.log('------------');
  // Show a snippet of the code around the cursor position
  const lines = code.split('\n');
  const start = Math.max(0, cursorPosition.line - 8);
  const end = Math.min(lines.length, cursorPosition.line + 1);
  
  for (let i = start; i < end; i++) {
    const prefix = i === cursorPosition.line ? '>>> ' : '    ';
    console.log(`${prefix}${i + 1}: ${lines[i]}`);
  }
  
  console.log('\nGenerating completion...');
  console.log('------------------------');

  try {
    const result = await engine.generateCompletion(
      code,
      cursorPosition,
      'javascript'
    );

    if (result.success) {
      console.log('✅ Completion generated successfully!');
      console.log('\nSuggested completion:');
      console.log('--------------------');
      console.log(result.completion);
      console.log('\nUsage statistics:');
      console.log('-----------------');
      console.log(result.usage);
    } else {
      console.log('❌ Completion failed:', result.error);
    }
  } catch (error: any) {
    console.error('Test error:', error.message);
  }
}

// Run the API example
apiExample();