<template>
  <div class="card card-width border border-success ">
    <div class="card-header bg-success"></div>
    <div class="card-body">
      <h4 class="card-title">
        <router-link :to="`/gradebooks/${gradebook.id}`" class="link">
          {{ gradebook.name }}
        </router-link>
      </h4>

      <!--Professor conditional displaying  -->
      <div v-if="gradebook.professor !== undefined && gradebook.professor !==null">
        <p class="card-text">Profesor: </p>
        <router-link :to="`/professors/${professor.id}`" class="link">
          {{ professor.first_name }} {{ professor.last_name }}
        </router-link>
      </div>
      <div v-else>
        <p>This gradebook does not have a professor.</p>
      </div>
      <p class="card-text">Vreme kreiranja:{{ gradebook.created_at}} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardGradebook',
  props: {
    gradebook: {
      required: false,
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  computed: {
    professor() {
      return this.gradebook.professor || {};
    }
  },
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