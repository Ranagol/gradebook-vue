<template>
  <div class="card card-width border border-success ">
    <img class="card-img-top" :src="professor.first_picture.picture_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title"></h5>
      <h5 class="card-title">
        <router-link :to="`/professors/${professor.id}`"  class="link">
          Professor: {{ professor.first_name }} {{ professor.last_name }}
        </router-link>
      </h5>
      <p class="card-text">Gradebook: <router-link :to="`/gradebooks/${professor.gradebook.id}`" class="link">{{ professor.gradebook.name }}</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProfessor',
  props: ['professor'],
  data() {
    return {
      
    }
  },
}
</script>

<style>
.card-width{
  margin: 10px;
  min-width: 200px;
  width: 300px;
}
</style>