<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const objectId = ref("default-object-id");
const carrier = ref();
const country = ref("France");
const postalCode = ref("75000");
const offer = ref();
const weight = ref<number>(0);
const dimensions = ref({
  length: 10,
  width: 10,
  height: 10,
});

const carriers = [null, "FedEx", "UPS", "La Poste", "Colissimo"];
const countries = ["France", "USA", "Canada", "Belgium", "UK"];
const offers = [null, "Express", "Economique"];

const submitForm = () => {
  emit("submit", {
    weight: weight.value,
    length: dimensions.value.length,
    width: dimensions.value.width,
    height: dimensions.value.height,
    country: country.value,
    type: offer.value,
    carrier: carrier.value,
  });
};
</script>

<template>
  <v-card variant="outlined">
    <v-card-title>Simulation tarifaire</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Entrer la référence ou l'ID de l'objet (facultatif)"
          v-model="objectId"
          variant="outlined"
        ></v-text-field>

        <v-select
          :items="carriers"
          label="Transporteurs"
          v-model="carrier"
          variant="outlined"
        ></v-select>

        <v-row>
          <v-col cols="6">
            <v-select
              :items="countries"
              label="Pays"
              v-model="country"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="Code postal"
              v-model="postalCode"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-select
          :items="offers"
          label="Offres d'envoi"
          v-model="offer"
          variant="outlined"
        ></v-select>

        <v-text-field
          label="Poids du colis (g)"
          type="number"
          v-model="weight"
          variant="outlined"
          min="0"
          max="10000"
        ></v-text-field>

        <v-row>
          <v-col cols="4">
            <v-text-field
              label="Longueur (cm)"
              type="number"
              v-model="dimensions.length"
              variant="outlined"
              min="10"
              max="100"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Largeur (cm)"
              type="number"
              v-model="dimensions.width"
              variant="outlined"
              min="10"
              max="100"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Hauteur (cm)"
              type="number"
              v-model="dimensions.height"
              variant="outlined"
              min="10"
              max="100"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn @click="submitForm" color="primary" block>Calculer</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
