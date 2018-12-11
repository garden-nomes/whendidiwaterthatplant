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
  </div>
</template>

<script lang="ts">
import Plant from "./Plant.vue";
import moment from "moment";
import api from "../api";
import { Component, Vue } from "vue-property-decorator";

interface PlantData {
  id: number;
  name: string;
  added: string;
  waterings: string[];
}

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

  created() {
    this.load().then(() => {
      this.$watch("plants", this.save, { deep: true });
    });
  }

  load() {
    const id = this.getKey();

    if (id) {
      return api.boards.get(id).then(({ data }) => {
        this.plants = data.plants;
      });
    } else {
      return Promise.resolve();
    }
  }

  save() {
    const id = this.getKey();

    if (id) {
      api.boards.put(id, { plants: this.plants });
    } else {
      api.boards
        .post({ plants: this.plants })
        .then(({ data }) => this.setKey(data.key));
    }
  }

  getKey() {
    return localStorage.getItem("boardId");
  }

  setKey(id: string) {
    localStorage.setItem("boardId", id);
  }
}
</script>