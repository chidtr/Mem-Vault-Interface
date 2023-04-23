<script setup>
import { googleTokenLogin } from "vue3-google-login";
import { ACCESS_TOKEN, EXPIRE } from "../api";
const emit = defineEmits(["userLoggedIn"]);

const login = () => {
  googleTokenLogin().then((response) => {
    localStorage.setItem(ACCESS_TOKEN, response.access_token);
    localStorage.setItem(EXPIRE, Date.now() + response.expires_in * 1000);
    emit("onUserLoggedIn");
  });
};
</script>

<template>
  <div class="login-component">
    <van-button block color="black" native-type="submit" @click="login">
      Login Using Google
    </van-button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #605e5e;
}

.login-component {
  margin-top: 150% !important;
}
</style>
