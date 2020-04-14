<template>
  <div class="card card-width border border-success ">
    <div class="card-header bg-success"></div>
    <div class="card-body">
      <h5 class="card-title">
        <router-link :to="`/gradebooks/${gradebook.id}`" class="link">{{ gradebook.name }}
        </router-link>
      </h5>
      <p class="card-text">Profesor: </p>
      <router-link :to="`/professors/${gradebook.professor.id}`" class="link">
        {{ gradebook.professor.first_name }} {{ gradebook.professor.last_name }}
      </router-link>
      <p class="card-text">Vreme kreiranja:{{ gradebook.created_at}} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardGradebook',
  props: ['gradebook'],
  methods: {
   
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