<template>
  <div class="row">
    <div class="col-8">
      <input
        name="picture_url"
        type="text"
        required="required"
        class="form-control here"
        v-model="pictureUrl"
      />
    </div>
    <button class="btn btn-danger" @click="deleteImageUrl">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'PictureUrlInput',
  props: {
    value: {
      type: String,
      required: true,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      pictureUrl: this.value
    }
  },
  watch: {
    pictureUrl: function (newVal) {
      this.$emit('input', newVal);
    }
  },
  methods: {
    deleteImageUrl() {
      this.$emit('deleteUrl');
    }
  }
}
</script>