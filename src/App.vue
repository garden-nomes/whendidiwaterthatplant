<template>
  <div id="app" class="container mt-3">
    <h1>whendidiwaterthat.pl/ant</h1>
    <plant-list/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PlantList from "./components/PlantList.vue";

@Component({
  components: { PlantList }
})
export default class App extends Vue {}
</script>

<style>
#app {
  max-width: 42em;
}
</style>