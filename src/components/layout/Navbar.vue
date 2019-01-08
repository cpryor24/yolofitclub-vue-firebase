<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="3000" top color="success">
      <span>Awesome! Your new workout has been scheduled.</span>
      <v-btn flat color="White" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon floating class="grey--text" @click="drawer = !drawer" v-if="user"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <router-link :to="{ name: 'Dashboard' }">
          <span class="font-weight-light">Yolofitness</span>
          <span>Club</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y v-if="user">
        <v-btn flat slot="activator" color="red">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat color="grey" v-if="!user">
        <span><router-link :to="{ name: 'Signup' }">Signup</router-link></span>
      </v-btn>
      <v-btn flat color="grey" v-if="!user">
        <span><router-link :to="{ name: 'Login' }">Login</router-link></span>
      </v-btn>
      <ul>
        <li v-if="user">{{ user.email }}</li>
      </ul>
      <v-btn flat color="grey" v-if="user">
        <span><a @click="logout">Logout</a></span>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="">
          </v-avatar>
          <p class="white--text subheading mt-1">The Username{{  }}</p>
        </v-flex>
        <!-- <v-flex class="mt-4 mb-3">
          <ScheduleWorkout @workoutAdded="snackbar = true" />
        </v-flex> -->
      <!-- <v-layout row justify-center> -->
        <v-btn color="success" dark @click="dialog = true">New Workout Session</v-btn>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
          <v-card tile>
            <v-toolbar card dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Workout Session</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <ScheduleWorkoutSession @workoutAdded="snackbar = true" />
            </v-card-text>
          </v-card>
        </v-dialog>
      <!-- </v-layout> -->
      </v-layout>

      <v-list >
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-dialog v-model="dialog2" persistent max-width="320" center>
        <v-list-tile class="warning darken-1" align-center>
          <v-list-tile-action>
            <v-icon class="white--text">nature_people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title   class="white--text">Body Mass Index (BMI)</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-btn slot="activator" flat dark py-0><v-icon class="white--text" left>nature_people</v-icon> Body Mass Index (BMI)</v-btn>
        <v-card>
          <v-card-text>
            <iframe src="https://www.weightlossagents.com/tools/bmi_calculator?s=300x250" scrolling="no" border="0" frameborder="0" width="300" height="250"></iframe>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning darken-1" flat @click="dialog2 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-list>
      <!-- Personal Trainer links -->
      <v-list v-if="personalTrainer">
        <v-list-tile v-for="trainerLink in trainerLinks" :key="trainerLink.text" router :to="trainerLink.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ trainerLink.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ trainerLink.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  import firebase from 'firebase';
  import ScheduleWorkoutSession from '@/components/layout/ScheduleWorkoutSession';

  export default {
    name: 'Navbar',
    components: {
      ScheduleWorkoutSession
    },
    data() {
      return {
        dialog: false,
        dialog2: false,
        user: null,
        drawer: false,
        links: [
          { icon: 'dashboard', text: 'Dashboard', route: '/'},
          { icon: 'place', text: 'Map', route: '/gmap'},
          { icon: 'account_box', text: 'My Profile', route: '/profile'},
          { icon: 'fitness_center', text: 'My Workouts', route: '/workouts'},
        ],
        personalTrainer: false,
        trainerLinks: [
          { icon: 'supervisor_account', text: 'Clients', route: '/clients'},
        ],
        snackbar: false
      }
    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
      
    },
    methods: {
      logout(){
        this.$store.dispatch('userLogOut');
      },
      getExerciseCategories() {
        this.$store.dispatch('userExerciseCategories')
        // this.$store.dispatch('filterExerciseCategories');
      },
      multiple() {
        // this.dialog = true
        // console.log('getter cat', this.$store.getters.getExerciseCategories);
      }
    },
    created(){
      let user = firebase.auth().currentUser;
      // console.log('created', user)
      firebase.auth().onAuthStateChanged( user => {
        if(user){
          this.user = user;
          // console.log('user', user)
          this.getExerciseCategories()
        } else {
          this.user = null;
        }
      })
    }
  }
</script>
