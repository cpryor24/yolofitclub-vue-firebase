<template>
  <h2>Workout</h2>
</template>

<script>
  export default {
    name: 'Workout', 
    data() {
      return {

      }
    },
    computed: {
      workouts() {
        return this.$store.state.workouts;
      }
    }
  }
</script>
