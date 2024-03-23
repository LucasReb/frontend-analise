import ApiService from "./api.server";

const SheetService = {
  async uploadSheet(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await ApiService.post('/sheets/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response;
    } catch (error) {
      console.error('Error uploading sheet:', error);
      throw error;
    }
  }
}

export default SheetService;