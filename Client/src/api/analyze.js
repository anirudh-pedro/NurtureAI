import axios from 'axios';

const API_BASE = 'http://localhost:8000';

/**
 * Call the /analyze endpoint with user text.
 * @param {string} text - Natural language input
 * @returns {Promise<object>} Parsed response with shopping_list, timeline, etc.
 */
export async function analyzeQuery(text) {
  const response = await axios.post(`${API_BASE}/analyze`, { text }, {
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
