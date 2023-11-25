<template>
  <div class="container scroll">
    <DeleteCategory />
    <addItems :catId="CAToF" />
    <!-- Button trigger modal -->
    <div class="fs-3">
      <div class="container locationName">{{ locationName }}</div>
      <br />
    </div>
    <div style="display: flex; flex-direction: column">
      <div>
        <button
          type="button"
          class="btn btn-primary float-start"
          data-bs-toggle="modal"
          data-bs-target="#addCategory"
        >
          Add New Page
        </button>
      </div>
    </div>

    <!--update Modal -->
    <div
      class="modal fade"
      id="CategoryUpdate"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content px-3">
          <div class="modal-header px-0 fs-5">
            Update Category
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="my-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="uName"
              id="exampleFormControlInput1"
            />
            <div class="mt-3 error-feedback text-danger" v-if="uNameError">
              {{ uNameError }}
            </div>
            <div class="mt-3 error-feedback text-danger" v-if="errorMessage">
              {{ errorMessage }}
            </div>
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Photo</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="uPreviewFiles"
            />
          </div>
          <div class="mb-3">
            <img
              :src="uSrcPhoto"
              width="500"
              class="rounded d-block mx-auto img-thumbnail"
            />
          </div>

          <div class="modal-footer px-0">
            <button
              id="closeCategoryUpdate"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="updateCate()">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addCategory"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form @submit.prevent>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add New Page
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
              <div class="mb-3">
                <label for="Name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  v-model="name"
                />
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label">Photo</label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  @change="previewFiles"
                />
              </div>
              <div class="error-feedback text-danger" v-if="photoError">
                {{ photoError }}
              </div>
              <div class="error-feedback text-danger" v-if="errorMessage">
                {{ errorMessage }}
              </div>
            </div>
            <div>
              <img
                :src="srcPhoto"
                width="500"
                class="rounded d-block p-2 mx-auto"
              />
            </div>
            <div class="modal-footer">
              <button
                id="closeCate"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="close"
              >
                Close
              </button>
              <button type="submit" @click="add" class="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <br />
    <div class="board" v-if="this.listOfCategories.length > 0">
      <div class="book">
        <input
          v-for="category in this.listOfCategories"
          v-bind:key="category.id"
          type="checkbox"
          :id="`c${category.id}`"
        />
        <div id="cover">
          <img
            :src="listOfImages[Object.keys(listOfImages)[0]]"
            class="pagedetails"
          />
        </div>
        <div class="flip-book">
          <div
            class="flip"
            v-for="(category, index) in this.listOfCategories"
            v-bind:key="category.name"
            :id="`p${category.id}`"
          >
            <div class="back">
              <img
                v-if="listOfImages[index + 1]"
                :src="listOfImages[index + 1]"
                class="pagedetails"
              />
              <label
                :for="`c${category.id}`"
                class="back-btn"
                @click="flip_back(listOfCategoriesLength[index], category.id)"
                >Before</label
              >
            </div>
            <div class="front">
              <div>
                <div
                  class="d-flex justify-content-between align-items-center flex-md-row flex-column mb-3"
                >
                  <!-- <h2 style="visibility: hidden">{{ category.name }}</h2> -->
                  <h2 style="flex: 1">{{ category.name }}</h2>
                  <label
                    class="additem"
                    data-bs-toggle="modal"
                    data-bs-target="#addItems"
                    style="text-align: end"
                    type="button"
                    @click="passCatId(category.id, category.name)"
                    >Add Items</label
                  >
                </div>
                <allItems />
              </div>
              <div>
                <div class="d-flex justify-content-between">
                  <label
                    class="next-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#CategoryDelete"
                    @click="delete_cate(category.id, category.name)"
                    >Delete</label
                  >
                  <label
                    class="next-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#CategoryUpdate"
                    @click="
                      update_cate(
                        category.id,
                        category.name,
                        listOfImages[index]
                      )
                    "
                    >Update</label
                  >
                  <label
                    v-if="index + 1 != listOfCategories.length"
                    :for="`c${category.id}`"
                    class="next-btn"
                    @click="
                      flip_next(listOfCategoriesLength[index + 1], category.id)
                    "
                    >NEXT</label
                  >
                  <label v-else class="next-btn">Last page</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <h1 class="locationName">Menu Not Found</h1>
    </div>
  </div>
</template>
<script>
import allItems from "@/components/allItems.vue";
import DeleteCategory from "@/components/DeleteCategory.vue";
import addItems from "@/components/addItems.vue";
import router from "@/router";
import store from "@/store/index.js";
import axios from "axios";
import $ from "jquery";
export default {
  name: "main-menu",
  components: { DeleteCategory, addItems, allItems },
  data() {
    return {
      locationName: "",
      name: "",
      nameError: "",
      srcPhoto: "",
      uID: "",
      uName: "",
      uNameError: "",
      uSrcPhoto: "",
      CAToF: {},
      userID: JSON.parse(localStorage.getItem("user-info"))[0]["id"],
      locationID: this.$route.params.id,
      errorMessage: "",
      photoError: "",
      currentNext: 0,
      currentPrev: 2,
    };
  },
  async mounted() {
    store.commit("listOfCategories", {
      userID: this.userID,
      locationID: this.locationID,
    });
    let user = localStorage.getItem("user-info");
    if (!user) {
      router.push("/Signup");
    }
    let userid = JSON.parse(user)[0]["id"];
    store.commit("middlewareLocations", {
      id: this.$route.params.id,
      userID: userid,
    });
    let result = await axios.get(
      `http://localhost:3000/Locations?id=${this.$route.params.id}&userID=${userid}`
    );

    //get 200
    if (result.status == 200 && result.data.length > 0) {
      this.locationName = result.data[0].name;
    }
    let categories = await axios.get(
      `http://localhost:3000/categories?locationID=${this.$route.params.id}&userID=${userid}`
    );

    //get 200
    if (categories.status == 200 && categories.data.length > 0) {
      this.z_index();
      // this.get_images();
    }
  },
  methods: {
    passCatId(id, name) {
      this.CAToF.id = id;
      this.CAToF.name = name;
    },
    z_index() {
      $('input[type="checkbox"]').prop("checked", false);
      setTimeout(() => {
        var num = store.state.listOfCategories.length;
        $(".flip").each(function () {
          $(this).css({
            "z-index": num,
            transform: "rotateY(0deg)",
          });
          num--;
        });
      }, 0);
    },
    delete_cate(id, name) {
      store.state.category.id = id;
      store.state.category.name = name;
    },
    update_cate(id, name, srcPhoto) {
      this.uID = id;
      this.uName = name;
      this.uSrcPhoto = srcPhoto;
    },
    flip_next(id, num) {
      this.currentNext++;
      setTimeout(() => {
        if ($(`#c${num}`).is(":checked")) {
          $(`#c${num}`).parent().find(".flip-book").find(`#p${num}`).css({
            transform: "rotateY(-180deg)",
            "z-index": this.currentNext,
          });
        }
      }, 0);
      setTimeout(() => {
        store.state.itemsOfCategoriesID = id;
      }, 50);
    },
    flip_back(id, num) {
      this.currentPrev++;
      setTimeout(() => {
        if (!$(`#c${num}`).is(":checked")) {
          $(`#c${num}`)
            .parent()
            .find(".flip-book")
            .find(`#p${num}`)
            .css({ transform: "rotateY(0deg)", "z-index": this.currentPrev });
        }
      }, 100);
      setTimeout(() => {
        store.state.itemsOfCategoriesID = id;
      }, 310);
    },
    async updateCate() {
      let filterCatName = store.state.listOfCategories.filter(
        (cate) => cate.name == this.uName
      );
      if (filterCatName.length > 0) {
        this.errorMessage = "Category Name already Exist ";
        setTimeout(() => {
          this.errorMessage = "";
          this.uName = "";
        }, 1500);
        return;
      }
      if (this.uName.length < 3 || this.uName.length > 10) {
        this.uNameError = "";
        this.uNameError =
          "This field should be at least 3 characters and at most 10 characters long";
        setTimeout(() => {
          this.uName = "";
        }, 1500);
        return;
      }
      let result = await axios.put(
        `http://localhost:3000/categories/${this.uID}`,
        {
          name: this.uName,
          photo: this.uSrcPhoto,
          userID: this.userID,
          locationID: this.locationID,
        }
      );
      $("#closeCategoryUpdate").click();
      //put 200
      if (result.status == 200) {
        store.commit("listOfCategories", {
          userID: this.userID,
          locationID: this.locationID,
        });
      }
    },
    close() {
      this.clearData();
    },
    clearData() {
      $("#Name").val("");
      $("#formFile").val("");
      this.srcPhoto = "";
      this.name = "";
    },
    async add() {
      let filterCatName = store.state.listOfCategories.filter(
        (cate) => cate.name == this.name
      );
      if (filterCatName.length > 0) {
        this.errorMessage = "Category Name already Exist ";
        setTimeout(() => {
          this.errorMessage = "";
          this.name = "";
        }, 1500);
        return;
      }
      if (this.srcPhoto == "") {
        this.photoError = "Image is required";
        setTimeout(() => {
          this.photoError = "";
        }, 1500);
        return;
      }
      if (this.name == "") {
        this.photoError = "Image is required";
        setTimeout(() => {
          this.photoError = "";
        }, 1500);
        return;
      }
      let result = await axios.post(`http://localhost:3000/categories`, {
        name: this.name,
        userID: this.userID,
        locationID: this.locationID,
        photo: this.srcPhoto,
      });
      $("#closeCate").click();
      //post 201
      if (result.status == 201) {
        store.commit("listOfCategories", {
          userID: this.userID,
          locationID: this.locationID,
        });
      }
    },
    previewFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.srcPhoto = reader.result;
      });
    },
    uPreviewFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.uSrcPhoto = reader.result;
      });
    },
  },
  computed: {
    listOfCategories() {
      return store.state.listOfCategories;
    },
    listOfCategoriesLength() {
      return store.state.listOfCategoriesLength;
    },
    listOfImages() {
      this.z_index();
      return store.state.categoryImages;
    },
  },
};
</script>

<style scope>
button {
  color: #fff;
  padding: 10px;
  border-radius: 10px;
}
.board,
.locationName {
  color: #ff5b4b;
  background-color: #ffffff1f;
  box-shadow: 5px 5px 5px #00000054;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

input[type="checkbox"] {
  display: none;
}

.pagedetails {
  width: 100%;
  height: 100%;
}

.book {
  display: flex;
}

#cover {
  width: 250px;
  height: 500px;
  flex: 1;
}

.flip-book {
  width: 250px;
  height: 500px;
  position: relative;
  perspective: 1500px;
  flex: 1;
}

.flip {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: left;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: 0.5s;
  color: #000;
}

p {
  height: 75%;
  font-size: 14px;
  line-height: 24px;
}

.front {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fafafa;
  box-sizing: border-box;
  padding: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.back {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  background-color: #000;
}

.next-btn {
  cursor: pointer;
  color: #000 !important;
}

.back-btn {
  position: absolute;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
  color: #fff !important;
}
.scroll {
  overflow: hidden;
}
.front {
  overflow-y: scroll;
}
/* Change scroll chrom style */
.front::-webkit-scrollbar {
  width: 9px;
  height: 7px;
}

.front::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
}

.front::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}
.additem {
  color: #000 !important;
}
</style>
