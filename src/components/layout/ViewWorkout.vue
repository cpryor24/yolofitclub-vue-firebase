<template>
  <div class="add-workout container">
    <h2 class="center-align red--text">Start Workout</h2>
    <v-layout justify-center>
      <v-flex xs12 sm6 md12>
        <v-card>
          <v-container  grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="card in cards" class="xs12 md4" :key="card.title">
                <v-card>
                  <v-img :src="card.src" height="200px">
                    <v-container fill-height fluid pa-2>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline white--text" v-text="card.title"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions>
                    <v-form class="px-1" ref="form">
                      <!-- <v-flex> -->
                        <div class="new-row px-2 ">
                          <span v-for="(rep, index) in exerciseReps" :key="index">
                            <v-text-field class="new-fields" label="Reps" v-model="exerciseReps[index]" :rules="repsRules"></v-text-field>
                          </span>
                          <span v-for="(weight, ind) in exerciseWeight" :key="ind" class="field-delete">
                            <v-text-field  class="new-fields " label="Weight" v-model="exerciseWeight[ind]" :rules="weightRules"></v-text-field>
                          </span >
                          <v-icon v-if="exerciseReps != [] && exerciseWeight != []" @click="deleteRepWeight(rep, weight)" small class="delete">delete</v-icon>
                        </div>
                        <div class="new-row px-2">
                          <v-text-field class="new-fields" label="Reps" v-model="reps" :rules="repsRules"></v-text-field>
                          <v-text-field  class="new-fields" label="Weight" v-model="weight" :rules="weightRules"></v-text-field>
                          <v-btn flat fab small dark class="success mx-0 add-btn" @click="addRow" ><v-icon>add</v-icon></v-btn>
                        </div>
                      <!-- </v-flex> -->
                      <v-divider></v-divider>
                      <v-spacer></v-spacer>
                      <div class="my-2">
                        <!-- {{ this.$route.params.id}} -->
                        <v-btn flat small center class="success mx-0 " @click="addExercise()" :loading="loading">Complete</v-btn>
                      </div>
                    </v-form>
                  </v-card-actions>
                </v-card>
              </v-flex>
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
    data () {
      return {
        reps: null,
        weight: null,
        loading: false,
        inputRules: [],
        cards: [
          { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
          { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
          { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
          { title: 'Delta', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
        ],
        repsRules: [],
        weightRules: [],
        exerciseReps: [],
        exerciseWeight: [],
        exerciseTime: [],
      }
    },
    methods: {
      addExercise() {
        console.log(this.exerciseReps, this.exerciseWeight);
        if(this.exerciseReps && this.exerciseWeight){
          console.log('here')
          this.inputRules = [];
        } else {
          this.inputRules = [v => !!v || 'This field is required']
        }
      },
      addRow() {
        if(this.reps && this.weight){
          this.exerciseReps.push(this.reps)
          this.exerciseWeight.push(this.weight)
          this.reps = null;
          this.weight = null;
          this.repsRules = [];
          this.weightRules = [];
        } else {
          this.repsRules = ['You must enter a value to add reps'];
          this.weightRules = ['You must enter a value to add weight'];
        }
      },
      deleteRepWeight(rep, weight) {
        this.exerciseReps = this.exerciseReps.filter(exerciseRep => exerciseRep != rep)
        this.exerciseWeight = this.exerciseWeight.filter(exerciseWght => exerciseWght != weight);
      }
    },
    computed: {
      // session() {
      //   return this.$store.getters.getWorkoutSession;
      // }
    },
    created() {
      console.log('route', this.$route.params.id)
    }
  }
</script>
<style >
  /* @media only screen and(min-width: 320px){
      .new-row .new-fields[data-v-4d78a143]{
        width: 55px !important;
        margin-right: 10px;
        display: inline-block;
      }

      .add-btn {
        width: 20px;
      }
    } */

  .add-workout h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .new-row .new-fields{
    width: 70px;
    margin-right: 40px;
    display: inline-block;
  }

  .add-btn {
    width: 20px;
  }

  .add-workout .field-delete {
    position: relative;
  }

  .add-workout .delete {
    /* position: absolute;
    right: 0;
    bottom: 16px; */
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }

</style>