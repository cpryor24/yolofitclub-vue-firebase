<template>
    <v-form class="px-3"  ref="form">
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step" ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field class="mb-3" v-model="email" label="Email" name="email" type="email" prepend-icon="email" :rules="emailRules" required></v-text-field>
              <v-text-field class="mb-3" v-model="password" label="Password" name="password" id="password" type="password" prepend-icon="lock" :rules="passwordRules" required></v-text-field>
              <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your iTalk Fitness account.
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field class="mb-3" v-model="first_name" label="First Name" name="first_name" type="text" prepend-icon="person" :rules="inputRules" required></v-text-field>
              <v-text-field class="mb-3" v-model="last_name" label="Last Name" name="last_name" type="text" prepend-icon="person" :rules="inputRules" required></v-text-field>
              <v-text-field class="mb-3" v-model="alias" label="Alias" name="alias" type="text" prepend-icon="person" :rules="aliasRules" required></v-text-field>
              <span class="caption grey--text text--darken-1">
                Please finish your profile after you login.
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-3 text-xs-center">
              <h3 class="title font-weight-light mb-2">iTalk Fitness is waiting for you {{this.first_name}}</h3>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" flat @click="step--"> Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step !== 3" :disabled="step === 3" color="primary" depressed @click="step++" >
            Next
          </v-btn>
        <v-btn v-if="step === 3" flat class="mx-0" color="primary"  @click.prevent="signup">Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import slugify from 'slugify';
  // import db from '@/firebase/fb';
  import firebase from 'firebase';

  export default {
    name: 'Signup',
    data(){
      return {
        step: 1,
        email: null,
        password: null,
        first_name: null,
        last_name: null,
        alias: null,
        isAdmin: false,
        userRole: 'user',
        isPersonalTrainer: false,
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
            slug: this.slug,
            isAdmin: this.isAdmin,
            userRole: this.userRole,
            isPersonalTrainer: this.isPersonalTrainer,
          })
        } else {
          this.inputRules;
        }
      }
    },
    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Create a password'
          default: return 'Almost there'
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
