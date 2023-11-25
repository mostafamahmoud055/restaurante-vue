<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addItems"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header fs-5">
          Add item to {{ idOfCat.name }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="d-flex mt-3">
          <div class="mx-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="itemName"
              id="itemName"
            />
            <div
              class="mt-3 error-feedback text-danger"
              v-if="v$.itemName.$error"
            >
              {{ v$.itemName.$errors[0].$message }}
            </div>
            <div class="mt-3 error-feedback text-danger" v-if="errorMessage">
              {{ errorMessage }}
            </div>
          </div>
          <div class="mx-3 mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Price</label
            >
            <input
              type="text"
              class="form-control"
              v-model="itemPrice"
              id="itemPrice"
            />
            <div class="mt-3 error-feedback text-danger" v-if="itemPriceError">
              {{ itemPriceError }}
            </div>
          </div>
        </div>
        <div class="mx-3 mb-3">
          <label for="itemDesc" class="form-label">Description</label>
          <input
            type="text"
            class="form-control"
            id="itemDesc"
            v-model="itemDesc"
          />
          <div
            class="mt-3 error-feedback text-danger"
            v-if="v$.itemDesc.$error"
          >
            {{ v$.itemDesc.$errors[0].$message }}
          </div>
        </div>

        <div class="modal-footer">
          <button
            id="closeAddItems"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addItem(idOfCat.id)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
import Validate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import $ from "jquery";
export default {
  name: "addItems",
  props: ["catId"],
  data() {
    return {
      v$: Validate(),
      itemName: "",
      itemDesc: "",
      itemPriceError: "",
      errorMessage: "",
      userID: JSON.parse(localStorage.getItem("user-info"))[0]["id"],
    };
  },
  validations() {
    // data info must be equal to validations info
    return {
      itemName: { required, minLength: minLength(5), maxLength: maxLength(30) },
      itemDesc: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(70),
      },
    };
  },
  computed: {
    idOfCat() {
      return this.catId;
    },
  },
  methods: {
    async addItem(id) {
      this.v$.$validate();
      let result = await axios.get(
        `http://localhost:3000/items?userId=${this.userID}&catId=${id}`
      );
      //get 200
      if (result.status == 200 && result.data.length > 0) {
        let filterItemName = result.data.filter(
          (item) => item.name == this.itemName
        );
        if (filterItemName.length > 0) {
          this.errorMessage = "Category Name already Exist ";
          setTimeout(() => {
            this.errorMessage = "";
          }, 2500);
          return;
        }
      }
      if (isNaN(+this.itemPrice)) {
        this.itemPriceError = "This field should be a number";
        return;
      }
      if (!this.v$.$error) {
        let result = await axios.post(`http://localhost:3000/items`, {
          name: this.itemName,
          price: this.itemPrice + " EGP",
          description: this.itemDesc,
          userID: this.userID,
          locID: this.$route.params.id,
          catId: id,
        });
        //post 201
        if (result.status == 201) {
          $("#itemName").val("");
          $("#itemDesc").val("");
          $("#itemPrice").val("");
          $("#closeAddItems").click();
          store.commit("listOfCategories", {
            userID: this.userID,
            locationID: this.$route.params.id,
          });
        }
      }
    },
  },
};
</script>

<style></style>
