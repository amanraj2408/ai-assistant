import { z } from 'zod';

const weatherSchema = z.object({
  location: z.string().describe('City name, e.g., London, New York'),
});

export const weatherTool = {
  description: 'Get current weather information for a location',
  parameters: weatherSchema,
  execute: async (params: z.infer<typeof weatherSchema>) => {
    if (!process.env.OPENWEATHERMAP_API_KEY) {
      throw new Error('OpenWeatherMap API key not configured');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.location}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Location not found');
      }

      const data = await response.json();
      return {
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: Math.round(data.main.feels_like),
      };
    } catch (error) {
      throw new Error(`Failed to fetch weather: ${error}`);
    }
  },
};

const stockSchema = z.object({
  symbol: z.string().describe('Stock symbol e.g., AAPL, GOOGL, MSFT, TSLA'),
});

export const stockTool = {
  description: 'Get current stock price for a given symbol',
  parameters: stockSchema,
  execute: async (params: z.infer<typeof stockSchema>) => {
    if (!process.env.ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key not configured');
    }

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${params.symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
      );

      const data = await response.json();

      if (
        !data['Global Quote'] ||
        !data['Global Quote']['05. price'] ||
        data['Global Quote']['05. price'] === '0.0000'
      ) {
        throw new Error(`Symbol ${params.symbol} not found`);
      }

      const quote = data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
        timestamp: quote['07. latest trading day'],
      };
    } catch (error) {
      throw new Error(`Failed to fetch stock price: ${error}`);
    }
  },
};

const f1Schema = z.object({});

export const f1Tool = {
  description: 'Get information about the next F1 race of the current season',
  parameters: f1Schema,
  execute: async () => {
    try {
      const currentYear = new Date().getFullYear();
      const response = await fetch(
        `http://ergast.com/api/f1/${currentYear}.json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch F1 data');
      }

      const data = await response.json();
      const races = data.MRData.RaceTable.Races;

      if (races.length === 0) {
        throw new Error('No races found for this season');
      }

      const nextRace = races[0];
      return {
        round: nextRace.round,
        name: nextRace.name,
        circuit: nextRace.Circuit.circuitName,
        date: nextRace.date,
        time: nextRace.time || 'Time TBA',
        location: `${nextRace.Circuit.Location.locality}, ${nextRace.Circuit.Location.country}`,
        url: nextRace.url,
      };
    } catch (error) {
      throw new Error(`Failed to fetch F1 race info: ${error}`);
    }
  },
};

export const tools = {
  getWeather: weatherTool,
  getStockPrice: stockTool,
  getF1Races: f1Tool,
};
