import ApiService from "./api.service";

export default class SheetService {
  async pingSheet() {
    try {
      const data = await ApiService.get('/sheets/ping');
      return data;
    } catch (error) {
      console.error('Error pinging sheet:', error);
      throw error;
    }
  }
}