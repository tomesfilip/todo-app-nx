const API_KEY = process.env.MOCKAPI_KEY;
if (!API_KEY) {
  throw new Error('MOCKAPI_KEY is not defined but required');
}

export const API_URL = `https://${API_KEY}.mockapi.io/api/`;
