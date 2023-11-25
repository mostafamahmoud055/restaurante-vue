import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
export default createStore({
  state: {
    user: localStorage.getItem("user-info"),
    home: true,
    category: {
      id: "",
      name: "",
    },
    categoryImages: {},
    listOfLocations: [],
    listOfCategories: [],
    listOfCategoriesLength: [],
    itemsOfCategories: [],
    itemsOfCategoriesID: "",
  },
  getters: {
    home(state) {
      return state.home;
    },
  },
  mutations: {
    home(state, isTrue) {
      state.home = isTrue;
    },
    async listOfLocations(state, payload) {
      let result = await axios.get(
        `http://localhost:3000/Locations?userID=${payload.userID}`
      );
      //get 200
      if (result.status == 200) {
        state.listOfLocations = result.data;
      }
    },
    async listOfCategories(state, payload) {
      state.itemsOfCategories = [];
      state.itemsOfCategoriesID = "";
      let result = await axios.get(
        `http://localhost:3000/categories?userID=${payload.userID}&locationID=${payload.locationID}`
      );
      //get 200
      if (result.status == 200) {
        state.listOfCategories = result.data;
        state.categoryImages = {};
        result.data.forEach((cate, i) => {
          state.categoryImages[`${i}`] = cate.photo;
          state.listOfCategoriesLength[`${i}`] = cate.id;
        });
      }
      let res = await axios.get(
        `http://localhost:3000/items?userID=${payload.userID}&locID=${payload.locationID}`
      );
      //get 200
      if (res.status == 200 && res.data.length > 0) {
        res.data.forEach((item, i) => {
          state.itemsOfCategories[`${i}`] = item;
        });
      }
    },
    async middlewareLocations(state, payload) {
      let result = await axios.get(
        `http://localhost:3000/Locations?id=${payload.id}&userID=${payload.userID}`
      );

      //get 200
      if (result.status == 200 && result.data.length == 0) {
        router.push("/");
      }
    },
  },
  actions: {},
  modules: {},
});
