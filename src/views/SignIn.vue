<template>
  <div class="container-fluid">
    <form
      class="w-50 m-auto display-6"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #2d2723a6;
        padding: 70px 40px;
        border-radius: 10px;
      "
    >
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          v-model="email"
        />
        <div class="error-feedback text-danger" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
        <div class="error-feedback text-danger" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>
      <button type="submit" @click.prevent="Login" class="btn btn-primary">
        Login
      </button>
      <div v-if="userNotFound" class="error text-center">
        {{ userNotFound }}
      </div>
    </form>
  </div>
</template>

<script>
import $ from "jquery";
import store from "@/store";
import router from "@/router";
import axios from "axios";
import Validate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "signIn",
  data() {
    return {
      v$: Validate(),
      email: "",
      password: "",
      userNotFound: "",
    };
  },
  updated() {
    if (this.userNotFound) {
      $(".error").delay(1000).fadeOut(800);
      setTimeout(() => {
        this.userNotFound = "";
      }, 1800);
    }
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      router.push("/");
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    async Login() {
      this.v$.$validate(); // validations() للبيانات اللي في  validate معناها اعملي
      if (!this.v$.$error) {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.email}&password=${this.password}`
        );
        //get 200
        if (result.status == 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          store.state.user = localStorage.getItem("user-info");
          router.push("/");
        } else {
          this.userNotFound = "User Not Found!";
        }
      }
    },
  },
};
</script>
<style scope>
label {
  color: #fff;
}

.form-control:focus {
  border-color: #000 !important;
  box-shadow: none !important;
}
.error {
  background: none;
  border: none;
  color: rgb(220, 53, 69);
}
</style>
