<template>
  <!-- <v-dialog max-width="600px" v-model="dialog"> -->
  <v-dialog  v-model="dialog">
    <v-btn flat slot="activator" class="success">add new workout session</v-btn>
    <v-card>
      <v-card-title>
        <h2>Schedule a New Workout Session</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                label="Completion date"
                prepend-icon="event"
                readonly
              ></v-text-field>
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
  </v-dialog>
</template>
<script>
  import moment from 'moment';
  import db from '@/firebase/fb';
  import firebase from 'firebase';

  export default {
    name: 'ScheduleWorkout',
    data() {
      return {
        title: '',
        content: '',
        date: null,
        modal: false,
        dialog: false,
        loading: false,
        status: null,
        user: null,
        alias: null,
        inputRules: [
          v => !!v || 'This field is required'
        ]
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
      workouts() {
        return this.$store.state.workouts;
      }
    }
  }
</script>

<style scoped>
  
</style>


