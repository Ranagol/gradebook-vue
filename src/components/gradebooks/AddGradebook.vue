<template>
  <div>
  <form @submit.prevent="onSubmit">
    <p>AddGradebook</p>
    <div class="form-group row">
      <label for="name" class="col-4 col-form-label">Name</label>
      <div class="col-8">
        <div class="input-group">
          <input
            id="name"
            name="name"
            type="text"
            required="required"
            class="form-control here"
            v-model="name"
          />
        </div>
      </div>
    </div>
    
  
    
    <div class="form-group row">
      <div class="offset-4 col-8">
        <button name="submit" type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>

  </div>
</template>

<script>
export default {
  name: 'AddGradebook',
  data(){
    return{
      name:'',
      gradebook:'',//TODO HOGY KEZDJEK AZ EGESZHEZ HOZZA?
    }
  },
  methods: {
    onSubmit(){

    }
  }
  
}
</script>