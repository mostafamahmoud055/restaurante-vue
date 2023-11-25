<template>
  <div class="parent" @load="mainData">
    <navbarComp />
    <br />
    <router-view />
  </div>
</template>
<script>
import navbarComp from "@/components/navbarComp.vue";
import store from "@/store/index.js";
export default {
  computed: {
    mainData() {
      let user = localStorage.getItem("user-info");
      let userID = JSON.parse(user)[0]["id"];
      store.commit("listOfLocations", { userID: userID });
      return true;
    },
  },
  components: {
    navbarComp,
  },
};
</script>
<style>
#app {
  position: relative;
}
.parent {
  font-family: cursive;
  min-height: 100vh;
  background-image: url("@/assets/headimg.jpg");
  background-size: cover;
  background-position: center center;
}

input {
  opacity: 0.8;
}
/* Change scroll chrom style */
body::-webkit-scrollbar {
  width: 9px;
  height: 7px;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
}

body::-webkit-scrollbar-thumb {
  background: #ff5b4b;
  border-radius: 10px;
}

*::selection {
  background-color: #ff5b4b;
  color: #fff;
}
</style>
