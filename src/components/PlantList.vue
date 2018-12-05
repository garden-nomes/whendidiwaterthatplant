<template>
  <div>
    <div class="row mt-4">
      <div v-for="plant in plants" :key="plant.id" class="col-lg-6 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-auto">{{ plant.name }}</h5>
            <p
              :class="textClass(plant)"
              v-if="hasWaterings(plant)"
            >Last watered {{ latestWatering(plant) | fromNow }}.</p>
            <div class="my-2">
              <button
                type="button"
                class="btn btn-outline-primary btn-lg w-100"
                @click="water(plant)"
              >Water</button>
            </div>

            <div class="row align-items-baseline">
              <div class="col">
                <small class="text-muted">added {{ plant.added | date }}</small>
              </div>

              <div class="col col-auto text-right">
                <button class="btn btn-sm btn-link text-danger" @click="remove(plant)">delete</button>
              </div>
            </div>
          </div>
        </div>
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
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";

interface Watering {
  id: number;
  time: string;
}

interface Plant {
  id: number;
  name: string;
  added: string;
  waterings: Watering[];
}

@Component({
  filters: {
    fromNow: (value: string) => moment(value).fromNow(),
    date: (value: string) => moment(value).format("LL")
  }
})
export default class PlantList extends Vue {
  plants: Plant[] = [];
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

  remove(plant: Plant) {
    if (confirm(`Are you sure you want to delete "${plant.name}"?`)) {
      this.plants.splice(this.plants.indexOf(plant), 1);
    }
  }

  water(plant: Plant) {
    plant.waterings.push({
      id: this.id,
      time: moment().format()
    });

    this.id++;
  }

  hasWaterings(plant: Plant) {
    return plant.waterings.length > 0;
  }

  latestWatering(plant: Plant) {
    return moment
      .unix(Math.max(...plant.waterings.map(w => moment(w.time).unix())))
      .format();
  }

  dangerLevel(plant: Plant) {
    const levels = [[1, "day"], [5, "days"], [10, "days"], [2, "weeks"]].map(
      ([...args]) => moment.duration(...args)
    );

    const watering = this.latestWatering(plant);

    const level = levels.find((duration, index) =>
      moment().isBefore(moment(watering).add(duration))
    );

    return level === undefined ? levels.length : levels.indexOf(level);
  }

  textClass(plant: Plant) {
    return ["text-success", "", "text-warning", "text-danger", "text-danger"][
      this.dangerLevel(plant)
    ];
  }

  mounted() {
    const plants = localStorage.getItem("plant-list");
    if (plants) {
      this.plants = JSON.parse(plants);
    }
  }

  updated() {
    localStorage.setItem("plant-list", JSON.stringify(this.plants));
  }
}
</script>