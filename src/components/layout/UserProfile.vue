<template>
  <v-layout>
    <v-container>
      <v-flex>
        <v-card
    class="hide-overflow"
    color="primary lighten-2"
    dark
    max-width="400px"
  >
    <v-toolbar
      card
      color="primary"
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn
        color="purple darken-3"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form class="px-3" ref="form">
      <v-card-text>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="First Name"
          v-model="first_name"
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Last Name"
          v-model="last_name"
        ></v-text-field>
        <v-textarea
          :disabled="!isEditing"
          color="white"
          label="Fitness Goals"
          v-model="goals"
        ></v-textarea>
        <v-textarea
          :disabled="!isEditing"
          color="white"
          label="Bio"
          v-model="bio"
        ></v-textarea>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Weight"
          v-model="weight"
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Height Feet"
          v-model="heightFt"
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Height Inch"
          v-model="heightInch"
        ></v-text-field>
        <v-flex xs12 sm6>
          <v-slider
          :disabled="!isEditing"
            v-model="age"
            :rules="rules.age"
            color="info"
            label="Age"
            hint="Be honest"
            min="1"
            max="100"
            thumb-label
          ></v-slider>
        </v-flex>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isEditing"
          color="success"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        absolute
        bottom
        left
      >
        Your profile has been updated
      </v-snackbar>
    </v-form>
  </v-card>
      </v-flex>
      <v-flex>
        <ViewProfile />
      </v-flex>
    </v-container>
  </v-layout>
  
</template>

<script>
  import ViewProfile from '@/components/layout/ViewProfile';
  export default {
    name: 'UserTestForm',
    components: {
      ViewProfile
    },
    data () {
      return {
        hasSaved: false,
        isEditing: null,
        first_name: null,
        last_name: null,
        goals: null,
        heightFt: null,
        heightInch: null,
        weight: null,
        bio: null,
        model: null,
        age: null,
        rules: {
          age: [
            val => val < 30 || `Really, I would never had guess that!`
          ],
          name: [val => (val || '').length > 0 || 'This field is required']
        },
      }
    },

    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      save () {

        let profile = {
          first_name: this.first_name,
          last_name: this.last_name,
          goals: this.goals,
          heightFt: this.heightFt,
          heightInch: this.heightInch,
          weight: this.weight,
          bio: this.bio,
          model: this.model,
          age: this.age
        }

        this.$router.dispatch('updateProfile', profile)
        this.isEditing = !this.isEditing
        this.hasSaved = true
      }
    }
  }
</script>