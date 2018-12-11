<template>
  <div class="card h-100">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-auto">{{ this.name }}</h5>
      <p :class="textClass" v-if="hasWaterings">Last watered {{ latestWatering | fromNow }}.</p>
      <div class="my-2">
        <button
          type="button"
          class="btn btn-outline-primary btn-lg w-100"
          @click="$emit('water')"
        >Water</button>
      </div>

      <div class="row align-items-baseline">
        <div class="col">
          <small class="text-muted">added {{ added | date }}</small>
        </div>

        <div class="col col-auto text-right">
          <button class="btn btn-sm btn-link text-danger" @click="$emit('remove')">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  filters: {
    fromNow: (value: string) => moment(value).fromNow(),
    date: (value: string) => moment(value).format("LL")
  }
})
export default class Plant extends Vue {
  @Prop(Array) waterings!: string[];
  @Prop(String) name!: string;
  @Prop(String) added!: string;

  get hasWaterings() {
    return this.waterings.length > 0;
  }

  get latestWatering() {
    return moment
      .unix(Math.max(...this.waterings.map(w => moment(w).unix())))
      .format();
  }

  get dangerLevel() {
    const levels = [[1, "day"], [5, "days"], [10, "days"], [2, "weeks"]].map(
      ([...args]) => moment.duration(...args)
    );

    const watering = this.latestWatering;

    const level = levels.find((duration, index) =>
      moment().isBefore(moment(watering).add(duration))
    );

    return level === undefined ? levels.length : levels.indexOf(level);
  }

  get textClass() {
    return ["text-success", "", "text-warning", "text-danger", "text-danger"][
      this.dangerLevel
    ];
  }
}
</script>

