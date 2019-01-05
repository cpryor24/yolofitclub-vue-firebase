<template>
   <v-card class="login" center>
    <v-card-title>
      <h2>Login</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3 login" ref="form" lazy-validation>
        <v-text-field class="mb-3" v-model="email" label="Email" name="email" type="email" prepend-icon="email" :rules="emailRules" required></v-text-field>
        <v-text-field class="mb-3" v-model="password" label="Password" name="password" id="password" type="password" prepend-icon="lock" :rules="passwordRules" required></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat class="mx-0" color="primary"  @click.prevent="login">Login</v-btn>
        </v-card-actions>
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
        // valid: false,
        email: null,
        password: null,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          // v => v.length >= 6 || 'Password must be greater than 6 characters'
        ],
        inputRules: []
      }
    },
    methods: {
      login() {
        console.log(this.email, this.password)
        if(this.$refs.form.validate()){
          this.$store.dispatch('userLogin', {
            email: this.email,
            password: this.password
          });
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
