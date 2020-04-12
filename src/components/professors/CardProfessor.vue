<template>
  <div class="card card-width border border-success ">
    <img class="card-img-top" src="http://lorempixel.com/200/200/people" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Professor: {{ professor.first_name }} {{ professor.last_name }}</h5>
      <p class="card-text">Gradebook: {{ professor.gradebook.name }}</p>
      <p v-bind="picture_url"></p>
      <!-- <p>{{ professor }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProfessor',
  props: ['professor'],
  data() {
    return {
      picture_url: this.professor.picture.picture_url,//TODO LOSI - WTF IS HERE THE PROBLEM?????? hogyan tenni oda ezt professor.picture.picture_url?
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