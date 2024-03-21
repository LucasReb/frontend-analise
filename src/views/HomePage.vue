<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script>
import SheetService from '@/services/sheet.service';

export default {
  data() {
    return {
      file: null
    };
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file)
    },

    async uploadFile() {
      try {
        const response = await SheetService.uploadSheet(this.file);
        console.log(response);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
};
</script>
