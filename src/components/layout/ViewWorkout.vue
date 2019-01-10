<template>
  <div class="add-workout container">
    <h2 class="center-align red--text">Start Workout</h2>
    <v-layout justify-center>
      <v-flex xs12 sm6 md12>
        <v-card>
          <v-container grid-list-md >
            <v-layout row wrap >
              <div>
                <div v-for="(sess, index) in session.selectedExercises" :key="index">
                  <v-flex class="xs12"  >
                    <div >
                      <v-card >
                        <v-img :src="sess.images[0]" height="200px">
                          <v-container fill-height fluid pa-2>
                            <v-layout fill-height>
                              <v-flex xs12 align-end flexbox>
                                <span class="headline white--text" v-text="sess.name"></span>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-img>
                        <v-btn color="green" class="mx-0" outline @click="getExercise(sess.name)">Start Workout</v-btn>
                      </v-card>
                    </div>
                  </v-flex>
                </div>
              </div>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'Workout',
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