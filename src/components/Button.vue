<template>
  <button @click="pingSheet">Ping API</button>
</template>

<script>
import SheetService from '@/services/sheet.service';

export default {
  methods: {
    async pingSheet() {
      try {
        const sheetService = new SheetService();
        const response = await sheetService.pingSheet();
        console.log('API Response:', response);
        this.$emit('api-response', response);
      } catch (error) {
        console.error('Error pinging API:', error);
      }
    }
  }
};
</script>
