<template>
  <v-card max-width="">
    <v-card-text>

      <v-tabs slot="extension" v-model="currentItem" color="primary" fixed-tabs slider-color="yellow" show-arrows>
        <v-tab v-for="exerciseCategory in showExerciseCategories" :href="'#tab-' + exerciseCategory" :key="exerciseCategory.id"> {{ exerciseCategory.id }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentItem">
        <v-tab-item v-for="exerciseCategory in showExerciseCategories" :value="'tab-'+ exerciseCategory" :key="exerciseCategory.id">
          id: {{ exerciseCategory.id }} name: {{ exerciseCategory.name }} images: {{ exerciseCategory.images }} instructions: {{ exerciseCategory.instructions }} value
          <v-card flat>
            <v-card-text>
              <h2>{{ exerciseCategory.id }}</h2>
              <!-- {{ text }} -->
              <v-layout row wrap>
                <v-flex xs12 mb-3>
                  <v-expansion-panel popout>
                    <v-expansion-panel-content
                      v-for="(exerciseCategory,i) in showExerciseCategories"
                      :key="i"
                    >
                      <v-icon slot="actions" color="primary">$vuetify.icons.expand</v-icon>
                      <div slot="header">Item Name:{{exerciseCategory.name}}</div>
                      <v-card>
                        <v-card-text>
                          <v-layout justify-space-between>
                            <v-flex xs12 ms4>
                              <div class="title mb-1">Default</div>
                              <v-layout column>
                                <div class="subheading">Matching</div>
                                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
                                <div class="subheading pt-3">Too high</div>
                                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
                                <div class="subheading pt-3">Too low</div>
                                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4"></v-img>
                              </v-layout>
                            </v-flex>

                            <v-flex xs12 ms4>
                              <div class="title mb-1">Contain</div>
                              <v-layout column>
                                <div class="subheading">Matching</div>
                                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" contain></v-img>
                                <div class="subheading pt-3">Too high</div>
                                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2" contain></v-img>
                                <div class="subheading pt-3">Too low</div>
                                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.4" contain></v-img>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                          <h2>Instructions</h2>
                          <ol>
                            <li >{{ exerciseCategory.instructions }}</li>
                          </ol>
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
        <!-- <v-tabs slot="extension" v-model="currentItem" color="primary" fixed-tabs slider-color="yellow" show-arrows>
        <v-tab v-for="item in items" :href="'#tab-' + item" :key="item"> {{ item }}</v-tab>
      </v-tabs> -->
        <v-flex xs12 sm6 md4>
          <v-dialog ref="dialog" v-model="modal" @click="showExerciseCategories" :return-value.sync="date" persistent lazy full-width width="290px">
            <v-text-field slot="activator" v-model="date" label="Completion date" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
        <v-textarea label="Workout Details" v-model="content" prepend-icon="edit"></v-textarea>


        <v-spacer></v-spacer>
        <v-btn flat class="success mx-0" @click="submit" :loading="loading">Add Workout Session</v-btn>
      </v-form>

    </v-card-text>
  </v-card>
</template>
<script>
  import moment from 'moment';
  import db from '@/firebase/fb';
  import firebase from 'firebase';

  export default {
    name: 'ScheduleWorkoutSession',
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
        inputRules: [
          v => !!v || 'This field is required'
        ],
        currentItem: 'tab-Chest',
        items: [
          // 'Web', 'Shopping', 'Videos', 'Images', 'News', 'Maps', 'Books', 'Flights', 'Apps'
        ],
        more: [
          // 'Go'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    created() {
      if(firebase.auth().currentUser){
        let ref = db.collection('users');
        // get current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.user = doc.data().user_id
              this.alias = doc.data().alias
            })
          })
      }
    },
    methods: {
      submit() {
        if(this.$refs.form.validate()){
          this.loading = true;
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
            status: this.status
          }

          db.collection('workouts').add(workout).then(() => {
            this.loading = false;
            this.dialog = false;
            this.$refs.form.reset();
            this.$emit('workoutAdded')
          })
        }
      }
    },
    computed: {
      formattedDate() {
        return this.date ? moment(this.date).format('ll') : ''
      },
      showExerciseCategories() {
        return this.$store.getters.getExerciseCategories;
      },
      workouts() {
        return this.$store.state.workouts;
      }
    }
  }
</script>

<style scoped>
  
</style>


