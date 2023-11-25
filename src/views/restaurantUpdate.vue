<template>
  <div class="container fs-4">
    <form @submit.prevent="update">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Restaurant Name</label
        >
        <input
          type="text"
          class="form-control"
          v-model="name"
          id="exampleFormControlInput1"
        />
        <div class="error-feedback text-danger" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Restaurant Address</label
        >
        <input
          type="text"
          class="form-control"
          v-model="address"
          id="exampleFormControlInput1"
        />
        <div class="error-feedback text-danger" v-if="v$.address.$error">
          {{ v$.address.$errors[0].$message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Restaurant Phone</label
        >
        <input
          type="text"
          class="form-control"
          v-model="phone"
          id="exampleFormControlInput1"
        />
        <div class="error-feedback text-danger" v-if="v$.phone.$error">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Restaurant Photo</label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="previewFiles"
        />
      </div>
      <div class="mb-3">
        <img
          :src="srcPhoto"
          width="500"
          class="rounded d-block mx-auto img-thumbnail"
        />
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import Validate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import router from "@/router";
export default {
  name: "Update-info",
  data() {
    return {
      v$: Validate(),
      name: "",
      address: "",
      phone: "",
      srcPhoto: "",
    };
  },
  validations() {
    // data info must be equal to validations info
    return {
      name: { required, minLength: minLength(10) },
      address: { required, minLength: minLength(10) },
      phone: { required, minLength: minLength(10) },
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      router.push("/Signup");
    }
    let userid = JSON.parse(user)[0]["id"];
    let result = await axios.get(
      `http://localhost:3000/Locations?id=${this.$route.params.id}&userID=${userid}`
    );

    //get 200
    if (result.status == 200 && result.data.length > 0) {
      this.name = result.data[0]["name"];
      this.address = result.data[0]["address"];
      this.phone = result.data[0]["phone"];
      this.srcPhoto = result.data[0]["photo"];
    } else {
      router.push("/");
    }
  },
  methods: {
    async update() {
      let user = localStorage.getItem("user-info");
      let userid = JSON.parse(user)[0]["id"];
      let id = this.$route.params.id;
      this.v$.$validate(); // validations() للبيانات اللي في  validate معناها اعملي
      if (!this.v$.$error) {
        let result = await axios.put(`http://localhost:3000/Locations/${id}`, {
          name: this.name,
          address: this.address,
          phone: this.phone,
          photo: this.srcPhoto,
          userID: userid,
        });

        //put 200
        if (result.status == 200) {
          router.push("/");
        }
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
  },
};
</script>

<style scope>
label {
  color: #bdbbbb !important;
}
</style>
