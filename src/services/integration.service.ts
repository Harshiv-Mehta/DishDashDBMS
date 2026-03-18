import axios from 'axios';

// This connects to your FastAPI server running on port 8000
const SCRAPER_URL = 'http://localhost:8000/compare';

export const callResearcher = async (productName: string) => {
  try {
    const response = await axios.post(SCRAPER_URL, {
      product_name: productName
    });
    
    // This returns the price data from Python (Zomato/Swiggy results)
    return response.data; 
  } catch (error) {
    console.error('Bridge Error: Could not reach FastAPI researcher.', error);
    throw new Error('Scraper connection failed');
  }
};