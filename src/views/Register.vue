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
      const vm = this;
      this.$store.dispatch('signUp',authData)
      .catch(statusCode=>{
        if(statusCode === 422) vm.isUniqueMail = false;
      })
    },
    signin (authData){
      const vm = this;
      this.$store.dispatch('signIn',authData)
      .catch(statusCode=>{
        if(statusCode === 404) vm.mailExists = false;
        if(statusCode === 401) {
          vm.mailExists = true
          vm.passwordCorrect = false
        }
      })
    }
  }
}
</script>
<style scoped>

</style>