<template>
  <v-content>
    <v-container>
      <Signup
      v-if="!haveAccount"
      :isUniqueMail="true"
      @toggle="haveAccount = true"
      @signup="signup"
      />
      <Signin
      v-if="haveAccount"
      :mailExists="true"
      :passwordCorrect="true"
      @toggle="haveAccount = false"
      @signin="signin"
      />
    </v-container>
  </v-content>
</template>
<script>
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'

export default {
  data : ()=>({
    haveAccount : false
  }),
  components : {
    Signup,
    Signin
  }
}
</script>
<style scoped>

</style>