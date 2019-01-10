<template>
  <div class="add-workout container">
    <h2 class="center-align primary--text">Complete {{ session.name }} Exercise</h2>
    <v-layout justify-center>
      <v-flex xs12 sm6 md12>
        <v-card>
          <v-container grid-list-md >
            <v-layout row wrap>
              <v-flex class="xs12">
                <v-card>
                  <v-img :src="session.images[0]" height="200px">
                    <v-container fill-height fluid pa-2>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline white--text" v-text="session.name"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-expansion-panel>
                    <v-expansion-panel-content>
                      <div slot="header">Details</div>
                      <v-card>
                        <v-card-text>Images</v-card-text>
                          <v-img v-for="(image, indx) in session.images" :key="indx" :src="image" class="my-1">
                            <v-container fill-height fluid pa-2>
                              <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-img>
                        <v-card-text>Instructions</v-card-text>
                        <ol>
                          <li v-for="(instruction, indx) in session.instructions" :key="indx" class="mx-1">{{ instruction }}</li>
                        </ol>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-card-actions>
                    <v-form class="px-1" ref="form">
                      <v-flex>
                        <div class="new-row px-2 " v-for="(rep, index) in exerciseRepsNWeight" :key="index">
                          <span >
                            <v-text-field :disabled="disabled" class="new-fields" label="Reps" v-model="exerciseRepsNWeight[index].reps" :rules="repsRules"></v-text-field>
                          </span>
                          <span >
                            <v-text-field :disabled="disabled"  class="new-fields " label="Weight" v-model="exerciseRepsNWeight[index].weight" :rules="weightRules"></v-text-field>
                          </span >
                          <v-icon v-if="exerciseRepsNWeight != []" @click="deleteRepWeight(index)" small class="delete">delete</v-icon>
                        </div>
                        <div class="new-row px-2">
                          <v-text-field class="new-fields" label="Reps" v-model="reps" :rules="repsRules"></v-text-field>
                          <v-text-field  class="new-fields" label="Weight" v-model="weight" :rules="weightRules"></v-text-field>
                          <v-btn flat fab small dark class="info mx-0 add-btn" @click="addRow" ><v-icon>add</v-icon></v-btn>
                        </div>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-spacer></v-spacer>
                      <div class="my-2">
                        <v-btn flat small center class="info mx-0 " @click="completeExercise(session.name)" :loading="loading" :rules="submitRules">Complete</v-btn>
                        <div :rules="submitRules"></div>
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
    name: 'Card',
    data () {
      return {
        disabled: false,
        reps: null,
        weight: null,
        loading: false,
        inputRules: [],
        submitRules: [],
        repsRules: [],
        weightRules: [],
        exerciseRepsNWeight: [],
        exerciseTime: [],
      }
    },
     methods: {
      completeExercise(name) {
        if(this.exerciseRepsNWeight.length > 0 ){
            let completedExercises = {
              name: this.exerciseRepsNWeight
            }
          this.$store.dispatch('finishExercise', completedExercises)
          this.disabled = true;
          this.inputRules = [];
        } else {
          this.inputRules = [v => !!v || 'This field is required']
        }
      },
      addRow() {
        if(this.reps && this.weight){
          this.exerciseRepsNWeight.push({
            reps: this.reps,
            weight: this.weight
          })
          this.reps = null;
          this.weight = null;
          this.repsRules = [];
          this.weightRules = [];
        } else {
          this.repsRules = ['You must enter a value to add reps.'];
          this.weightRules = ['You must enter a value to add weight.'];
          this.submitRules = ['Please add at least one set for reps and weight to submit.']
        }
      },
      deleteRepWeight(index) {
        this.exerciseRepsNWeight = [...this.exerciseRepsNWeight.slice(0, index), ...this.exerciseRepsNWeight.slice(index + 1)]
      }
    },
    computed: {
      session() {
        return this.$store.getters.getExercise;
      },
      showExerciseCategories() {
        return this.$store.getters.getExerciseCategories;
      }
    }
  }
</script>
<style >
  .add-workout h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .new-row .new-fields,
  .new-data .new-fields {
    width: 70px;
    margin-right: 40px;
    display: inline-block;
  }

  .new-data {
    display: block;
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

