<template>
  <div class="timeline">
    <h1 class="subheading greay--text">Workout Sessions</h1>
    <v-timeline align-top >
      <v-timeline-item 
        v-for="(workout, i) in workouts"
        color="primary darken-1"
        icon=""
        :key="i"
        fill-dot
      >
        <span
          slot="opposite"
          class="headline font-weight-bold info--text darken-1"
          v-text="workout.date"
        ></span>
        <v-card
          color="info"
          dark
        >
          <v-card-title class="title">{{ workout.title }}</v-card-title>
          <v-card-text class="white text--primary">
            <div v-if="workout.content != ''">
              <p>{{ workout.content }}</p>
            </div>
            <ul v-for="(exercise, index) in workout.selectedExercises" :key="index">
              <li>{{ exercise.name }}</li>
            </ul>
            <v-btn
              color="primary"
              class="mx-0"
              outline
              @click="startWorkout(workout.id)"
            >
              Start Workout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
  
</template>
<script>
  export default {
    name: 'Timeline',
    methods: {
      startWorkout(id) {
        this.$store.dispatch('startWorkoutSession', id)
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

