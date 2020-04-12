<template>
  <div>
    <p>Gradebooks</p>
    <p>{{ gradebooks }}</p>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Gradebooks',
  computed: {
    ...mapGetters(['gradebooks']),
  },
  methods: {
    ...mapActions(['getAllGradebooks']),
  },
  created(){
    this.getAllGradebooks();
  }
}
</script>