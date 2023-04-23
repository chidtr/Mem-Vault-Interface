<script setup>
import { addNote } from "../meli-search";
import { reactive } from "vue";

const emit = defineEmits(["noteAdded"]);
const state = reactive({ note: "", success: false, failed: false });
const props = defineProps(["searchIndex", "searchKey"]);

const onSubmit = async () => {
  console.log(state.note);
  try {
    await addNote(props.searchKey, props.searchIndex, state.note);
    state.note = "";
    emit("noteAddedSuccess", true);
  } catch (error) {
    emit("noteAddedSuccess", false);
  }
};
</script>

<template>
  <van-form @submit="onSubmit" class="note-form">
    <van-cell-group inset>
      <div class="van-cell note-form-field-label">New Note</div>
      <van-field
        v-model="state.note"
        type="textarea"
        rows="4"
        autosize
        placeholder="Enter your note here"
        autofocus
        input-align="left"
        :rules="[{ required: true, message: 'Note is required' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button block color="black" native-type="submit"> Save </van-button>
    </div>
  </van-form>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.note-form-field-label {
  text-align: left;
}

.note-form {
  margin-top: 60%;
}
</style>
