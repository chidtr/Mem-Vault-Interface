<script setup>
import { reactive } from "vue";
import { searchNote } from "../meli-search";
import { onMounted } from "vue";

import moment from "moment";

const props = defineProps(["searchIndex", "searchKey"]);

const state = reactive({
  search: null,
  loading: true,
  notes: [],
  currentId: null,
  opened: false,
});

const queryParams = reactive({
  limit: 10,
  offset: 0,
  sort: "desc",
  order: "createdAt",
});

const onSearch = async () => {
  const result = await searchNote(
    props.searchKey,
    props.searchIndex,
    state.search,
    queryParams
  );
  state.notes = result.hits;
  queryParams.limit = result.limit;
  queryParams.offset = result.offset;
};

const formatDate = (time) => {
  return moment(time).format("YYYY-MM-DD HH:MM");
};

const onClickNote = (id) => {
  if (!state.currentId) {
    state.currentId = id;
    state.opened = true;
  } else if (state.currentId === id) {
    state.currentId = null;
    state.opened = false;
  }
};

onMounted(onSearch);
</script>

<template>
  <div>
    <van-search
      v-model="state.search"
      placeholder="Search"
      @search="onSearch"
    />

    <van-list>
      <van-cell v-for="item in state.notes" :key="item.id">
        <van-text-ellipsis
          v-show="state.currentId === item.id && state.opened === true"
          v-html="item._formatted.note"
          rows="2"
          expand-text="expand"
          collapse-text="collapse"
          class="note-field"
        >
        </van-text-ellipsis>

        <div
          class="van-multi-ellipsis--l2 note-field"
          @click="onClickNote(item.id)"
          v-show="!(state.currentId === item.id && state.opened === true)"
        >
          <span v-html="item._formatted.note"></span>
        </div>

        <span style="font-size: smaller">{{ formatDate(item.time) }}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.note-field {
  text-align: left;
  color: black;
}

.note-field:hover {
  cursor: pointer;
}
</style>
