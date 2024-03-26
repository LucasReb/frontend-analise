import axios from 'axios';

const ApiService = {
  init() {
    axios.defaults.baseURL = "http://3.145.181.174/";
    console.log(import.meta.env.MODE)
  },

  async get(resource) {
    try {
      const response = await axios.get(resource);
      return response.data;
    } catch (error) {
      throw new Error(`API Service Error: ${error}`);
    }
  },

  async post(resource, data) {
    try {
      const response = await axios.post(resource, data);
      return response.data;
    } catch (error) {
      throw new Error(`API Service Error: ${error}`);
    }
  },

  async put(resource, data) {
    try {
      const response = await axios.put(resource, data);
      return response.data;
    } catch (error) {
      throw new Error(`API Service Error: ${error}`);
    }
  },

  async delete(resource) {
    try {
      const response = await axios.delete(resource);
      return response.data;
    } catch (error) {
      throw new Error(`API Service Error: ${error}`);
    }
  },
};

ApiService.init();

export default ApiService;
