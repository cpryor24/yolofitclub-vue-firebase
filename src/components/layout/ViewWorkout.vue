<template>
  <div class="add-workout container">
    <h2 class="center-align primary--text">Start Workout</h2>
    <v-layout>
      <v-hover v-for="(sess, index) in session.selectedExercises" :key="index" class="mb-3" row wrap>
          <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600">
            <v-img :aspect-ratio="16/9" :src="sess.images[0]">
              <v-expand-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text" style="height: 100%;">
                  Start Workout
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-4" style="position: relative;">
              <v-btn absolute color="primary" class="white--text" fab large right top outline @click="getExercise(sess.name)">
                <v-icon>forward</v-icon>
              </v-btn>
              <div class="font-weight-light grey--text title mt-4 mb-2">For perfect form, see instructions...</div>
              <h3 class="display-1 font-weight-light primary--text mb-2">{{ sess.name }}</h3>
              <div class="font-weight-light title mb-2"></div>
            </v-card-text>
          </v-card>
      </v-hover>
    </v-layout>
  </div>
</template>

<script>
import Test from '@/components/layout/Test';
  export default {
    name: 'Workout',
    components: {
      Test
    },
    methods: {
      getExercise(name) {
        let params = this.$route.params.id;
        this.$store.dispatch('completeExercise', {
          name, params
        })
      }
    },
    computed: {
      session() {
        return this.$store.getters.getWorkoutSession;
      },
      showExerciseCategories() {
        return this.$store.getters.getExerciseCategories;
      }
    }
  }
</script>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>