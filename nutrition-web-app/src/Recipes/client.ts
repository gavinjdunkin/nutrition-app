import axios from "axios";
axios.defaults.withCredentials = true;
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`${BASE_API}/recipe`, {
        params: { q: searchQuery }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };