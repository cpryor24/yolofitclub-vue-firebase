<template>
  <div v-if="user" class="view-profile container">
     <v-container style="max-width: 600px;">
      <h2 class="center" >{{ profile.alias }}'s Wall</h2>
      <v-timeline v-if="profile" dense clipped>
        <v-timeline-item fill-dot class="white--text mb-5" color="orange" large>
          <span slot="icon">{{ profile.alias }}</span>
          <v-text-field v-model="newComment" hide-details flat label="Leave a comment..." solo @keydown.enter="addComment">
            <template slot="append">
              <v-btn class="mx-0" depressed @click="addComment"> Post</v-btn>
            </template>
          </v-text-field>
        </v-timeline-item>
        <v-slide-x-transition group>
          <v-timeline-item  v-for="(comment, index) in comments" :key="index" class="mb-3" color="primary" small>
            <v-layout justify-space-between>
              <v-flex xs6 v-text=" comment.content "></v-flex>
              <v-flex xs2 text-xs-right v-text="formattedTime(comment.time) "></v-flex>
              <v-flex xs4 text-xs-right v-text=" comment.from "></v-flex>
            </v-layout>
          </v-timeline-item>
        </v-slide-x-transition>
      </v-timeline>
    </v-container>
  </div>
</template>
<script>
  import db from '@/firebase/fb';
  import firebase from 'firebase';
  import moment from 'moment';

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
                content: change.doc.data().content,
                time: change.doc.data().time
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
      },
      formattedTime(time) {
        return moment(time).format('ll')
      }
    },
    computed: {
      timeline () {
        return this.events.slice().reverse()
      },
      
    }
  }
</script>