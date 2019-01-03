<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="center">{{ profile.alias }}'s Wall</h2>
    </div>
  </div>
</template>
<script>
  import db from '@/firebase/fb';
  export default {
    name: 'ViewProfile',
    data() {
      return {
        profile: null
      }
    },
    created() {
      let ref = db.collection('users')
      ref.doc(this.$route.params.id).get()
        .then(user => {
          this.profile = user.data();
        })
    }
  }
</script>

