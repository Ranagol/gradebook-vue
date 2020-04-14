<template>
  <div class="card card-width border border-success ">
    <img class="card-img-top" :src="firstPicture.picture_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title"></h5>
      <h5 class="card-title">
        <router-link :to="`/professors/${professor.id}`"  class="link">
          Professor: {{ professor.first_name }} {{ professor.last_name }}
        </router-link>
      </h5>
      <p class="card-text">Gradebook: <router-link :to="`/gradebooks/${gradebook.id}`" class="link">{{ gradebook.name }}</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProfessor',
  props: {
    professor: {
      required: false,
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    firstPicture() {
      return this.professor.first_picture || {};
    },
    gradebook() {
      return this.professor.gradebook || {};
    }
  }
}
</script>

<style>
.card-width{
  margin: 10px;
  min-width: 200px;
  width: 300px;
}
</style>