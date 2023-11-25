<template>
  <div class="container-fluid">
    <form class="w-50 m-auto display-6">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" type="text" class="form-control" v-model="name" />
        <div class="error-feedback text-danger" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="Email" class="form-label">Email</label>
        <input id="Email" type="text" class="form-control" v-model="email" />
        <div class="error-feedback text-danger" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </div>
      </div>
      <label for="password" class="form-label">Password</label>
      <div class="mb-3">
        <input
          id="password"
          type="password"
          class="form-control"
          v-model="password"
        />
        <div class="error-feedback text-danger" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </div>
      </div>
      <button type="submit" @click.prevent="signup" class="btn btn-primary">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Validate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import router from "@/router";
export default {
  name: "signUp",
  data() {
    return {
      // data info must be equal to validations info
      v$: Validate(),
      name: "",
      email: "",
      password: "",
    };
  },
  validations() {
    // data info must be equal to validations info
    return {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      router.push("/");
    }
  },
  methods: {
    async signup() {
      this.v$.$validate(); // validations() للبيانات اللي في  validate معناها اعملي
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        //post 201
        if (result.status == 201) {
          router.push("/Signin");
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
form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2d2723a6;
  padding: 70px 40px;
  border-radius: 10px;
}
.form-control:focus {
  border-color: #000 !important;
  box-shadow: none !important;
}
</style>
