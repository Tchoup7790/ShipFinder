<script setup lang="ts">
defineProps(["results"]);
</script>

<template>
  <v-card v-if="results" variant="outlined">
    <v-card-title>Results</v-card-title>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="offer in results.offers"
        :title="offer.carrier + ' : ' + offer.price + '€'"
        :text="offer.price + ' jours de delais de livraison'"
      >
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
