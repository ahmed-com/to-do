<template>
  <v-content>
    <v-container>
      <Signup
      v-if="!haveAccount"
      :isUniqueMail="isUniqueMail"
      @toggle="toggle"
      @signup="signup"
      />
      <Signin
      v-if="haveAccount"
      :mailExists="mailExists"
      :passwordCorrect="passwordCorrect"
      @toggle="toggle"
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
    haveAccount : false,
    isUniqueMail : true,
    mailExists : true,
    passwordCorrect : true
  }),
  components : {
    Signup,
    Signin
  },
  methods : {
    toggle(){
      this.haveAccount = !this.haveAccount;
      this.isUniqueMail = true;
      this.mailExists = true;
      this.passwordCorrect = true;
    },
    signup(authData){
      // the sign up logic
      this.$store.dispatch('signUp',authData)
      .then(()=>console.log('sign up succeded'))
      .catch(console.log)
    },
    signin (authData){
      // the sign in logic
      this.$store.dispatch('signIn',authData)
      .then(()=> console.log('sign in succeded'))
      .catch(console.log)
    }
  }
}
</script>
<style scoped>

</style>