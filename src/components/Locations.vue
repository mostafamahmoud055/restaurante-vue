<template>
  <div class="row justify-content-around" style="gap: 30px">
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalDelete"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="fs-5 modal-body">
            Are you sure you want to delete
            <span style="color: #ff5b4b"> {{ deletedName }} </span>
            restaurant?
          </div>
          <div class="modal-footer">
            <button
              id="closeModalDelete"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="deleteCard">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ///////////////////////////////////// -->
    <div
      class="card col-xl-3 col-sm-4 col-6"
      v-for="location in allLocations"
      :key="location.id"
    >
      <img :src="location.photo" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ location.name }}</h5>
        <p></p>
        <a
          class="map"
          target="blank"
          :href="`https://www.google.com/maps/place/${location.address}`"
        >
          <font-awesome-icon icon="fa-solid fa-location-dot" />
          {{ location.address }} </a
        ><br />
        <p></p>
        <a :href="`tel:${location.phone}`" class="tel">
          <font-awesome-icon icon="fa-solid fa-phone" />
          {{ location.phone }} </a
        ><br />
        <br />
        <div class="row justify-content-around">
          <a class="col-lg-3 col-12 btn btn-primary mt-1 p-x-1 View"
            ><router-link
              class="nav-link"
              style="color: #fff !important"
              :to="{ name: 'Menu', params: { id: location.id } }"
              >Menu</router-link
            ></a
          >
          <a class="col-lg-3 col-12 btn btn-primary mt-1 p-x-1 Update"
            ><router-link
              class="nav-link"
              style="color: #fff !important"
              :to="{ name: 'Update', params: { id: location.id } }"
              >Update</router-link
            ></a
          >
          <a
            class="col-lg-3 col-12 btn btn-primary mt-1 p-x-1 Delete"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalDelete"
            @click="deletedIDfun"
            >Delete</a
          >

          <input type="hidden" name="id" :value="location.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import store from "@/store/index.js";
export default {
  data() {
    return {
      deletedID: "",
      deletedName: "",
      catIdLength: [],
      itemsLength: [],
      itemsIdLength: [],
    };
  },
  name: "LocationsView",
  props: ["allLocations"],
  methods: {
    deletedIDfun() {
      this.deletedID = $(event.target)
        .closest(".card-body")
        .find("input[type=hidden]")
        .val();
      this.deletedName = $(event.target)
        .closest(".card-body")
        .find("h5")
        .text();
    },
    async deleteCard() {
      let result = await axios.get(
        `http://localhost:3000/categories?locationID=${this.deletedID}`
      );
      if (result.status == 200) {
        for (let index = 0; index < result.data.length; index++) {
          this.catIdLength.push(result.data[index].id);
        }
        console.log(this.catIdLength);
        for (let index = 0; index < this.catIdLength.length; index++) {
          let itemResults = await axios.get(
            `http://localhost:3000/items?catId=${this.catIdLength[index]}`
          );
          this.itemsLength.push(itemResults.data);
        }
        console.log(this.itemsLength);

        console.log("/------------------/");
        for (let indexOUT = 0; indexOUT < this.itemsLength.length; indexOUT++) {
          for (
            let indexIN = 0;
            indexIN < this.itemsLength[indexOUT].length;
            indexIN++
          ) {
            this.itemsIdLength.push(this.itemsLength[indexOUT][indexIN].id);
          }
        }
        console.log(this.itemsIdLength);
      }

      let resultLOC = await axios.delete(
        `http://localhost:3000/Locations/${this.deletedID}`
      );
      if (resultLOC.status == 200) {
        for (let index = 0; index < this.catIdLength.length; index++) {
          await axios.delete(
            `http://localhost:3000/categories/${this.catIdLength[index]}`
          );
        }
        for (let index = 0; index < this.itemsIdLength.length; index++) {
          await axios.delete(
            `http://localhost:3000/items/${this.itemsIdLength[index]}`
          );
        }
      }
      $("#closeModalDelete").click();
      let user = localStorage.getItem("user-info");
      let userID = JSON.parse(user)[0]["id"];
      store.commit("listOfLocations", { userID: userID });
    },
  },
};
</script>
<style>
.card {
  background-color: #ffffff0d;
  box-shadow: 5px 5px 5px #00000054;
  padding: 0px;
  border-radius: 20px;
  color: aliceblue;
  height: fit-content;
}
.map,
.tel {
  color: aliceblue;
  text-decoration: none;
}
.map:hover,
.map:focus,
.tel:hover,
.tel:focus {
  color: #ff5b4b;
}
.btn-primary {
  background-color: #ff5b4b73 !important;
  border-color: transparent !important;
}
.btn-primary:hover {
  background-color: #ff5b4b !important;
  border-color: transparent !important;
}
</style>
