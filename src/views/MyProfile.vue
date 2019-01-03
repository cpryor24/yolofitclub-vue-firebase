<template>
  <div>
    <UserProfile />
    <UserTestForm />
  </div>
  

</template>

<script>
  import UserTestForm from '@/components/UserTestForm';
  import UserProfile from '@/components/layout/UserProfile';

  export default {
    components: {
      UserProfile,
      UserTestForm
    }
  }
</script>
