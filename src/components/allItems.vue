<template>
  <div v-for="item in this.allitems" :key="item">
    <div
      v-if="itemsOfCategoriesID == item.catId"
      class="d-flex justify-content-between flex-md-row flex-column"
    >
      <p class="name fs-6">
        {{ item.name }}
        <br />
        <span class="desc">{{ item.description }}</span>
      </p>
      <br />
      <div v-if="itemsOfCategoriesID == item.catId">{{ item.price }}</div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import store from "@/store/index.js";
export default {
  name: "allItems",
  computed: {
    allitems() {
      return store.state.itemsOfCategories;
    },
    itemsOfCategoriesID() {
      let id = "";
      let firstID = JSON.parse(JSON.stringify(store.state.listOfCategories))[0];
      let fstID = { ...firstID };
      if (store.state.itemsOfCategoriesID) {
        id = store.state.itemsOfCategoriesID;
      } else {
        id = fstID.id;
      }
      return id;
    },
  },
  methods: {},
};
</script>

<style>
.name {
  text-align: start;
}
.desc {
  font-size: 0.8rem;
}
</style>
