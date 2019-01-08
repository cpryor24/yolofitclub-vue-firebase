<template>
  <div class="add-workout container">
    <h2 class="center-align red--text">Start Workout</h2>
    <form>
      <div class="field title">
        <label for="title">Exercise Title: </label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field add-reps">
        <label for="add-reps">Add Reps</label>
        <input type="text" name="add-reps">
      </div>
      <div class="field center-align">
        <button class="btn">Add Reps</button>
      </div>
      
    </form>

    <v-form class="px-3" ref="form">
      <v-text-field label="Title" v-model="title" prepend-icon="folder" ></v-text-field>
      <v-textarea label="Workout Details" v-model="content" prepend-icon="edit"></v-textarea>
      
      <v-spacer></v-spacer>
      <v-btn flat class="success mx-0" @click="submit" :loading="loading">Finish workout</v-btn>
    </v-form>

  </div>
</template>

<script>
  export default {
    name: 'Workout',
    data () {
      return {
        title: null,
        loading: false,
        inputRules: [

        ]

      }
    }
  }
</script>
