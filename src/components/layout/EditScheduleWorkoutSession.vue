<template>
  <v-container v-if="showExerciseCategories">
    <v-toolbar color="cyan" dark tabs>
      <v-tabs slot="extension" v-model="currentItem" color="transparent" fixed-tabs show-arrows>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :href="'#tab-' + item" :key="item">{{ item }}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="currentItem">
      <v-tab-item v-for="item in items" :value="'tab-' + item" :key="item">
        <v-card flat>
          <v-card-text>
            <h2>{{ item }}</h2>
            <v-layout row wrap>
              <v-flex xs12 mb-3>
                <v-expansion-panel popout focusable v-for="(exerciseCategory,i) in tabFilter(showExerciseCategories)" :key="i">
                  <v-expansion-panel-content  v-for="(exercise, index) in exerciseCategory.workout" :key="index">
                    <v-icon slot="actions" color="primary">$vuetify.icons.expand</v-icon>
                    <div slot="header" x>{{ exercise.name }}</div>
                    <v-card >
                      <v-card-text>
                        <div class="title mb-1">Images</div>
                        <v-layout justify-space-around >
                          <div v-for="(image, i) in exercise.images" :key="i"></div>
                          <v-flex xs12 ms4>
                            <v-layout column>
                              <v-img :src=image aspect-ratio="2" max-height="350px" max-width="350px" class="mb-2" contain v-for="(image, i) in exercise.images" :key="i"></v-img>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                        <h2>Instructions</h2>
                        <ol>
                          <li v-for="(instruction, i) in exercise.instructions" :key="i">{{ instruction }}</li>
                        </ol>
                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <v-container fluid>
                          <p>Please select your exercises for this workout session: {{ exerciseCategory.selectedExercises }}</p>
                          <v-switch v-model="selectedExercises" color="success" :label="exercise.name" :value="exercise.name"></v-switch>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-spacer></v-spacer>
    <v-form class="px-3" ref="form">
      <v-flex xs12 sm6 md4>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px" :rules="dateRules">
          <v-text-field slot="activator" v-model="workoutSession.date" label="Completion date" prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-text-field label="Title" v-model="workoutSession.title" prepend-icon="folder" :rules="inputRules"></v-text-field>
      <v-textarea label="Workout Details" v-model="workoutSession.content" prepend-icon="edit"></v-textarea>
      <v-container fluid>
        <p>List of exercises for this workout session: {{ selectedExercises }} {{ workoutSession.selectedExercises }}</p>
        <!-- <v-switch v-for="(ws, i) in exerciseCategory.selectedExercises" :key="i" v-model="exerciseCategory.selectedExercises" :label="ws" :value="ws"></v-switch> -->
      </v-container>
      <v-spacer></v-spacer>
      <v-btn flat class="success mx-0" @click="submit" :loading="loading">Edit Workout Session</v-btn>
    </v-form>
  </v-container>
</template>
<script>
  export default {
    name: 'EditWorkoutSession',
    data() {
      return {
        title: '',
        content: '',
        date: null,
        modal: false,
        loading: false,
        status: null,
        user: null,
        alias: null,
        time: null,
        inputRules: [
          v => !!v || 'This field is required'
        ],
        dateRules: [
          v => !!v || 'This field is required'
        ],
        currentItem: 'tab-Abductors',
        items: [
          'Abductors', 'Abs', 'Adductors', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Neck', 'Quadriceps', 'Shoulders', 'Traps', 'Triceps'
        ],
        selectedExercises: [],
        
      }
    },
    computed: {
      workoutSession() {
        return this.$store.getters.getWorkoutSession
      },
      showExerciseCategories() {
        return this.$store.getters.getExerciseCategories;
      }
    },
    methods: {
      submit() {
        if(this.$refs.form.validate()){
          this.loading = true;
          this.time = moment(new Date()).format('ll');
          if(moment(this.date).format('ll') < moment(new Date()).format('ll')){
            this.status = 'overdue';
          } else {
            this.status = 'ongoing';
          }
          const workout = {
            title: this.title,
            content: this.content,
            date: this.date,
            alias: this.alias,
            user_id: this.user,
            selectedExercises: this.selectedExercises,
            status: this.status,
            updatedAt: this.time
          }

          console.log('selected', this.selectedExercises)
          console.log('time', this.time)
          this.$store.dispatch('editWorkoutSession', workout);
          this.loading = false;
          this.dialog = false;
          this.selectedExercises = [];
          this.$refs.form.reset();
        } else {
          this.inputRules,
          this.dateRules
        }
      },
      tabFilter(exercises) {
        return exercises.filter(exercise => 'tab-' + exercise.id == this.currentItem)
        
      },
      userSelectedExercises() {
        this.$store.dispatch('setExercises')
      }
    }
  }
</script>
