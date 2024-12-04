<script setup lang="ts">
import { ref } from "vue";
import ShippingForm from "./components/ShippingForm.vue";
import ShippingResults from "./components/ShippingResults.vue";

const results = ref(null);

const handleFormSubmit = async (formData: any) => {
  try {
    const response = await fetch("http://localhost:3000/shipping/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    results.value = await response.json();
  } catch (error) {
    console.error("Error fetching results:", error);
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <ShippingForm @submit="handleFormSubmit" />
      </v-col>

      <v-col md="6">
        <ShippingResults :results="results" />
      </v-col>
    </v-row>
  </v-container>
</template>
