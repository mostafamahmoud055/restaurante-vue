<template>
  <div class="container-fluid">
    <NewLocation />
    <LocationsView
      v-bind:allLocations="listOfLocations"
      v-if="listOfLocations.length > 0"
    />
    <div class="container" v-else>
      <h1 class="notFound">Restaurants Not Found</h1>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import NewLocation from "@/components/NewLocation.vue";
import LocationsView from "@/components/Locations.vue";
import store from "@/store/index.js";
// import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      userID: "",
    };
  },
  components: { NewLocation, LocationsView },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      router.push("/Signup");
    }
    if (user) {
      let userID = JSON.parse(user)[0]["id"];
      store.commit("listOfLocations", { userID: userID });
    }
  },
  computed: {
    listOfLocations() {
      return store.state.listOfLocations;
    },
  },
};
</script>
<style scope>
.notFound {
  color: #ff5b4b;
  background-color: #ffffff0d;
  box-shadow: 5px 5px 5px #00000054;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}
</style>
