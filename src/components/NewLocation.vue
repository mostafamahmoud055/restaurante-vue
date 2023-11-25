<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="AddRestaurant"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Add New Restaurant
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="RestaurantName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="RestaurantName"
                  v-model="rName"
                />
              </div>
              <div class="error-feedback text-danger" v-if="nameError">
                {{ nameError }}
              </div>
              <div class="mb-3">
                <label for="RestaurantPhone" class="form-label">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="RestaurantPhone"
                  v-model="rPhone"
                />
              </div>
              <div class="error-feedback text-danger" v-if="phoneError">
                {{ phoneError }}
              </div>
              <div class="mb-3">
                <label for="RestaurantAddress" class="form-label"
                  >Address</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="RestaurantAddress"
                  v-model="rAddress"
                />
              </div>
              <div class="error-feedback text-danger" v-if="addressError">
                {{ addressError }}
              </div>
              <div class="mb-3">
                <label for="RestaurantPhoto" class="form-label">Photo</label>
                <input
                  type="file"
                  class="form-control"
                  id="RestaurantPhoto"
                  @change="previewFiles"
                />
              </div>
              <div class="error-feedback text-danger" v-if="photoError">
                {{ photoError }}
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              id="closeModalRestaurant"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="close"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="add">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import store from "@/store/index.js";
export default {
  name: "NewLocation",
  data() {
    // data info must be equal to validations info
    return {
      rName: "",
      rAddress: "",
      rPhone: "",
      rPhoto: "",
      nameError: "",
      addressError: "",
      phoneError: "",
      photoError: "",
    };
  },
  methods: {
    close() {
      this.clearData();
    },
    clearData() {
      $("#RestaurantName").val("");
      $("#RestaurantAddress").val("");
      $("#RestaurantPhone").val("");
      $("#RestaurantPhoto").val("");
    },
    async add() {
      this.nameError = "";
      this.addressError = "";
      this.photoError = "";
      this.phoneError = "";
      if ($("#RestaurantName").val().length < 3) {
        this.nameError = "This field should be at least 3 characters long";
      }
      if ($("#RestaurantAddress").val().length < 12) {
        this.addressError = "This field should be at least 12 characters long";
      }
      if ($("#RestaurantPhone").val().length < 10) {
        this.phoneError = "This field should be at least 10 characters long";
      }
      if (!Number.isInteger(+$("#RestaurantPhone").val())) {
        this.phoneError = "This field should be a number";
      }
      if (this.rPhoto == "") {
        this.photoError = "Image is required";
      }
      setTimeout(() => {
        this.nameError = "";
        this.addressError = "";
        this.phoneError = "";
        this.photoError = "";
      }, 3000);
      if (
        this.nameError ||
        this.addressError ||
        this.phoneError ||
        this.photoError
      ) {
        return;
      } else {
        let result = await axios.post(`http://localhost:3000/Locations`, {
          name: this.rName,
          address: this.rAddress,
          phone: this.rPhone,
          photo: this.rPhoto,
          userID: JSON.parse(localStorage.getItem("user-info"))[0].id,
        });
        //post 201
        if (result.status == 201) {
          this.retrieveLocations();
          this.clearData();
          $("#closeModalRestaurant").click();
        }
      }
    },
    async retrieveLocations() {
      let user = localStorage.getItem("user-info");
      let userID = JSON.parse(user)[0]["id"];
      store.commit("listOfLocations", { userID: userID });
    },
    previewFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.rPhoto = reader.result;
      });
    },
  },
};
</script>
