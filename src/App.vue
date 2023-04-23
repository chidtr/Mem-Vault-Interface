<template>
  <div style="padding: 15px">
    <van-notify v-model:show="state.isSuccess" type="success">
      <van-icon name="bell" style="margin-right: 4px" />
      <span>{{ state.message }}</span>
    </van-notify>
    <van-notify v-model:show="state.isFailed" type="danger">
      <van-icon name="bell" style="margin-right: 4px" />
      <span>{{ state.message }}</span>
    </van-notify>

    <van-loading v-if="state.loading" color="#1989fa" style="margin: auto" />

    <SearchNote
      v-if="state.screen == 'search' && state.user && !state.loading"
      :searchIndex="state.selectedSpace.id"
      :searchKey="state.user && state.user.key"
      style="padding-top: 50px"
    >
    </SearchNote>

    <PersonalNoteForm
      v-if="state.screen == 'newNote' && state.user && !state.loading"
      :searchIndex="state.selectedSpace.id"
      :searchKey="state.user && state.user.key"
      @noteAddedSuccess="noteAddedSuccess"
    >
    </PersonalNoteForm>

    <Login
      v-if="!state.user && !state.loading"
      @onUserLoggedIn="onUserLoggedIn"
      style="margin-top: 50px"
    >
    </Login>

    <div v-if="state.user && !state.loading">
      <van-action-bar style="align-items: center" justify="space-between">
        <van-action-bar-icon
          style="padding-left: 15px"
          span="8"
          icon="search"
          @click="changeScreen('search')"
          text="Search"
        />
        <van-action-bar-icon
          style="padding-left: 50px"
          span="8"
          icon="plus"
          text="Note"
          @click="changeScreen('newNote')"
        />

        <van-cell :title="state.selectedSpace.name" style="font-weight: bold" />
      </van-action-bar>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PersonalNoteForm from "./components/PersonalNoteForm.vue";
import SearchNote from "./components/SearchNote.vue";
import Login from "./components/Login.vue";
import { reactive } from "vue";
import { onMounted } from "vue";
import { ACCESS_TOKEN, EXPIRE, getUserInfo, getSpaces } from "./api";

const state = reactive({
  screen: "",
  selectedSpace: null,
  spaces: [],
  isSuccess: false,
  isFailed: false,
  message: "",
  item: "12",
  user: null,
  loading: true,
});

const changeScreen = (value) => {
  state.screen = value;
};

const noteAddedSuccess = (value) => {
  if (value) {
    state.isSuccess = true;
    state.message = "Create note successfully";
  } else {
    state.isFailed = true;
    state.message = "Create note failed";
  }
  
  setTimeout(() => {
    state.isSuccess = false;
    state.isFailed = false;
    state.message = "";
  }, 3000);
};

const onUserLoggedIn = async () => {
  state.user = await getUserInfo();
  console.log(99);
  state.spaces = await getSpaces();
  console.log(222);
  state.selectedSpace = state.spaces[0];
  state.loading = false;
  state.screen === "search";
};

const getInitData = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const expire = localStorage.getItem(EXPIRE);

  if (!token) {
    // login
    console.log("user does not login ");
    state.loading = false;
    state.screen === "login";
    return;
  }

  if (expire < Date.now()) {
    console.log(expire, Date.now());
    // relogin
    console.log("token expire");
    state.loading = false;
    state.screen === "login";
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRE);
  } else {
    console.log(2);
    console.log("Get access token");
    await onUserLoggedIn();
  }
};

computed(state.screen);
// computed(state.selectedSpace);

onMounted(getInitData);
</script>

<style scoped>
.app-signup-page {
  /* background-color: #56bc9c; */
  color: white;
}
.selected-index {
  font-weight: bold;
}

.index-item:hover {
  cursor: pointer;
}
</style>
