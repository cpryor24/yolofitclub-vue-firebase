<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="center">{{ profile.alias }}'s Wall</h2>
      <v-card class="view-profile" center>
        <v-card-text>
          <v-form class="px-3 login" ref="form">
            <v-text-field class="mb-3" v-model="newComment" label="Add a comment" :rules="inputRules"></v-text-field>
            <v-btn flat class="success mx-0" @click.prevent="addComment">Add Comment</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import db from '@/firebase/fb';
  import firebase from 'firebase';

  export default {
    name: 'ViewProfile',
    data() {
      return {
        profile: null,
        newComment: null,
        inputRules: [],
        user: null,
        comments: []
      }
    },
    created() {
      let ref = db.collection('users')
      // get current user
      ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.user = doc.data(),
            this.user.id = doc.id
          })
        })
      // profile data
      ref.doc(this.$route.params.id).get()
        .then(user => {
          this.profile = user.data();
        })

      // comments
      db.collection('comments').where('to', '==', this.$route.params.id )
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              this.comments.unshift({
                from: change.doc.data().from,
                content: change.doc.data().content
              })
            }
          })
        })
    },
    methods: {
      addComment() {
        if(this.newComment){
          this.inputRules = [];
          db.collection('comments').add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now()
          }).then(() => {
            this.newComment = null;
          })
        } else {
          this.inputRules = ['You must enter a comment to submit']
        }
      }
    }
  }
</script>

<style scoped>
  .view-profile .card {
    padding: 20px;
    margin-top: 40px;
  }

  .view-profile h2 {
    font-size: 2em;
    margin-top: 0;
  }

  .view-profile li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
</style>


