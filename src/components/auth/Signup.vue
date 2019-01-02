<template>
  <v-card class="signup" center>
    <v-card-title>
      <h2>Sign up</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3 signup" ref="form">
        <v-text-field class="mb-3" v-model="email" label="Email" prepend-icon="email" ></v-text-field>
        <v-text-field class="mb-3" v-model="password" label="Password" prepend-icon="security" ></v-text-field>
        <v-text-field class="mb-3" v-model="alias" label="Alias" prepend-icon="person" :rules="inputRules"></v-text-field>
        <v-btn flat class="success mx-0" @click.prevent="signup">Signup</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import slugify from 'slugify';
  import db from '@/firebase/fb';
  import firebase from 'firebase';

  export default {
    name: 'Signup',
    data(){
      return {
        email: null,
        password: null,
        first_name: null,
        last_name: null,
        alias: null,
        inputRules: [
          v => !!v || 'You must enter all fields'
        ],
        slug: null
      }
    },
    methods: {
      signup() {
        if(this.alias && this.email && this.password){
          this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+`.()'"!\-:]/g,
            lower: true
          });
          let ref = db.collection('users').doc(this.slug);
          ref.get().then(doc => {
            if(doc.exists){
              this.inputRules = ['This alias already exists'];
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  ref.set({
                    alias: this.alias,
                    geolocation: null,
                    user_id: cred.user.uid
                  })
                }).then(() => {
                  this.$router.push({
                    name: 'GMap'
                  })
                })
                .catch(err => {
                  this.inputRules = [err.message]
                })
            }
          })
        } else {
          this.inputRules;
        }
      }
    }
 }
</script>

<style scoped>
  .signup {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 60px;
  }

  .signup h2 {
    font-size: 2.4em;
  }
</style>
