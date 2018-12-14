<template>
  <div>
    <div class="row mt-4">
      <div v-for="plant in plants" :key="plant.id" class="col-lg-6 mb-4">
        <Plant v-bind="plant" @water="water(plant)" @remove="remove(plant)"/>
      </div>
    </div>

    <form @submit.prevent="add" class="mt-3">
      <label for="add-plant">Add a plant</label>

      <div class="input-group">
        <input v-model="name" class="form-control" id="add-plant" placeholder="Name">
        <div class="input-group-append">
          <button type="submit" class="btn btn-primary">&plus;</button>
        </div>
      </div>
    </form>

    <div class="text-muted text-center small mt-4">Share these plants:
      <div class="input-group input-group-sm">
        <input :value="shareUrl" type="text" class="form-control" disabled>
        <div class="input-group-append">
          <button role="button" class="btn btn-outline-secondary" @click="copyUrlToClipbord">copy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Plant from "./Plant.vue";
import moment from "moment";
import api from "../api";
import { copyToClipboard } from "../lib/clipboard";
import { Component, Vue } from "vue-property-decorator";

interface PlantData {
  id: number;
  name: string;
  added: string;
  waterings: string[];
}

const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/;

@Component({
  components: { Plant }
})
export default class PlantList extends Vue {
  plants: PlantData[] = [];
  name = "";
  id = 0;

  add() {
    this.plants.push({
      id: this.id,
      name: this.name,
      added: moment().format(),
      waterings: []
    });

    this.name = "";
    this.id++;
  }

  remove(plant: PlantData) {
    if (confirm(`Are you sure you want to delete "${plant.name}"?`)) {
      this.plants.splice(this.plants.indexOf(plant), 1);
    }
  }

  water(plant: PlantData) {
    plant.waterings.push(moment().format());
  }

  get shareUrl() {
    return window.location.href + this.getKey();
  }

  copyUrlToClipbord() {
    copyToClipboard(this.shareUrl);
  }

  created() {
    this.loadSaved().then(() => {
      this.$watch("plants", this.save, { deep: true });
    });
  }

  loadSaved() {
    const key = this.getKey();

    if (key) {
      return this.load(key);
    } else {
      return Promise.resolve();
    }
  }

  load(key: string) {
    return api.boards.get(key).then(({ data }) => {
      this.plants = data.plants;
    });
  }

  save() {
    const key = this.getKey();

    if (key) {
      api.boards.put(key, { plants: this.plants });
    } else {
      api.boards
        .post({ plants: this.plants })
        .then(({ data }) => this.setKey(data.key));
    }
  }

  getKey() {
    const match = uuidRegex.exec(window.location.pathname);

    if (match) {
      const key = match[0];
      this.setKey(key);
      window.history.replaceState({}, document.title, "/");
      return key;
    } else {
      return localStorage.getItem("key");
    }
  }

  setKey(key: string) {
    localStorage.setItem("key", key);
  }
}
</script>