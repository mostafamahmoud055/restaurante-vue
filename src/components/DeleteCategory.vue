<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="CategoryDelete"
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
          <span style="color: #ff5b4b"> {{ categoryInfo().name }} </span>
          page?
        </div>
        <div class="modal-footer">
          <button
            id="closeCategoryDelete"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteCate(categoryInfo().id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- ///////////////////////////////////// -->
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
import $ from "jquery";
export default {
  name: "DeleteCategory",
  data() {
    return {
      allItemsID: [],
    };
  },
  methods: {
    categoryInfo() {
      return store.state.category;
    },
    async deleteCate(id) {
      let result = await axios.delete(`http://localhost:3000/categories/${id}`);
      // delete 200;
      if (result.status == 200) {
        let res = await axios.get(`http://localhost:3000/items?catId=${id}`);
        if (res.status == 200) {
          for (let index = 0; index < res.data.length; index++) {
            this.allItemsID.push(res.data[index].id);
          }
        }

        for (let index = 0; index < this.allItemsID.length; index++) {
          await axios.delete(
            `http://localhost:3000/items/${this.allItemsID[index]}`
          );
        }
      }

      store.commit("listOfCategories", {
        userID: JSON.parse(localStorage.getItem("user-info"))[0]["id"],
        locationID: this.$route.params.id,
      });
      $("#closeCategoryDelete").click();
    },
  },
};
</script>

<style></style>
