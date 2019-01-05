<template>
  <v-card class="signup" center>
    <v-card-title>
      <h2>Sign up</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3 signup"  ref="form">
        <v-text-field class="mb-3" v-model="email" label="Email" name="email" type="email" prepend-icon="email" :rules="emailRules" required></v-text-field>
        <v-text-field class="mb-3" v-model="password" label="Password" name="password" id="password" type="password" prepend-icon="lock" :rules="passwordRules" required></v-text-field>
        <v-text-field class="mb-3" v-model="first_name" label="First Name" name="first_name" type="text" prepend-icon="security" :rules="inputRules" required></v-text-field>
        <v-text-field class="mb-3" v-model="last_name" label="Last Name" name="last_name" type="text" prepend-icon="security" :rules="inputRules" required></v-text-field>
        <v-text-field class="mb-3" v-model="alias" label="Alias" name="alias" type="text" prepend-icon="person" :rules="aliasRules" required></v-text-field>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="mx-0" color="primary"  @click.prevent="signup">Signup</v-btn>
      </v-card-actions>
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
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          // v => v.length >= 6 || 'Password must be greater than 6 characters'
        ],
        
        aliasRules: [
          v => !!v || 'Alias is required',
          // v => v.length >= 3 || 'Password must be greater than 3 characters'
        ],
        inputRules: [
          v => !!v || 'This field is required'
        ],
        slug: null
      }
    },
    methods: {
      signup() {
        if(this.$refs.form.validate()){
          this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+`.()'"!\-:]/g,
            lower: true
          });
          this.$store.dispatch('userSignup', {
            email: this.email,
            password: this.password,
            first_name: this.first_name,
            last_name: this.last_name,
            alias: this.alias,
            slug: this.slug
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
