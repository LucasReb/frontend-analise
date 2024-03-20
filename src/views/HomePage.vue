<template>
  <div>
    <h1>{{ responseData }}</h1>
    <Button @api-response="handleApiResponse" />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button
  },
  data() {
    return {
      responseData: null
    };
  },
  methods: {
    async handleApiResponse(response) {
      this.responseData = response; 
    }
  }
};
</script>
