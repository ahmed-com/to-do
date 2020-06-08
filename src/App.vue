<template>
  <v-app >
    <router-view v-if="auth"></router-view>
    <Register v-if="!auth"></Register>
  </v-app>
</template>
<script>
import Register from '@/views/Register';

export default {
  computed : {
    auth(){
      return this.$store.state.auth
    }
  },
  components : {
    Register
  }
}
</script>
<style scoped>

</style>