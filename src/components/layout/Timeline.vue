<template>
  <v-timeline align-top>
    <v-timeline-item
      v-for="(workout, i) in workouts"
      color="purple darken-1"
      icon=""
      :key="i"
      fill-dot
    >
      <span
        slot="opposite"
        class="headline font-weight-bold green--text darken-1"
        v-text="workout.date"
      ></span>
      <v-card
        color="indigo"
        dark
      >
        <v-card-title class="title">{{ workout.title }}</v-card-title>
        <v-card-text class="white text--primary">
          <p>{{ workout.content }}</p>
          <v-btn
            color="green"
            class="mx-0"
            outline
            @click="startWorkout"
          >
            Start Workout
          </v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
  export default {
    name: 'Timeline',
    data() {
      return {
        
      }
    },
    methods: {
      startWorkout() {
        
      }
    },
    computed: {
      workouts() {
        return this.$store.getters.getWorkouts;
      }
    },
    created() {
      this.$store.dispatch('setWorkouts')
    }
    
  }
</script>

