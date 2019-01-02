<template>
   <v-card class="login" center>
    <v-card-title>
      <h2>Login</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3 login" ref="form">
        <v-text-field class="mb-3" v-model="email" label="Email" prepend-icon="email" :rules="inputRules"></v-text-field>
        <v-text-field class="mb-3" v-model="password" label="Password" prepend-icon="security" :rules="inputRules"></v-text-field>
        <v-btn flat class="success mx-0" @click.prevent="login">Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
  import firebase from 'firebase';

  export default {
    name: 'Login',
    data(){
      return {
        email: null,
        password: null,
        inputRules: []
      }
    },
    methods: {
      login() {
        console.log(this.email, this.password)
        if(this.email && this.password){
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              console.log(cred.user)
              this.$router.push({
                name: 'Dashboard'
              })
            }).catch(err => {
              this.inputRules = [err.message];
            })
          this.inputRules = []
        }else {
          inputRules = ['Please fill in both fields'];
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 60px;
  }

  .login h2 {
    font-size: 2.4em;
  }
</style>
