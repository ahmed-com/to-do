<template>
  <form>
    <v-text-field
      v-model="mail"
      :error-messages="emailErrors"
      label="E-mail"
      hint="E.g. test@test.com"
      @blur="$v.mail.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPW ? 'text' : 'password'"
      label="Password"
      hint="Between 5 and 14 characters"
      counter
      :error-messages="passwordErrors"
      @click:append="showPW = !showPW"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear" class="mr-4">clear</v-btn>
    <v-btn @click="toggle">Sing Up -></v-btn>
  </form>
</template>
<script>
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

  export default {
    
    props: {
      mailExists : {
        type : Boolean,
        required : false,
        default : true
      },
      passwordCorrect : {
          type : Boolean,
          required : false,
          default : true
      }
    },

    validations: {
      mail: { 
        required, 
        email
      },
      password : {
        required,
        minLen : minLength(5),
        maxLen : maxLength(14)
      }
    },

    data: () => ({
      mail: '',
      password : '',
      showPW : false
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.mail.$dirty) return errors
        !this.$v.mail.email && errors.push('Must be valid e-mail')
        !this.$v.mail.required && errors.push('E-mail is required')
        !this.mailExists && errors.push('E-mail incorrect')
        return errors
      },
      passwordErrors (){
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        !this.$v.password.minLen && errors.push('Password should be atleast 5 charcters long')
        !this.$v.password.maxLen && errors.push('Password should be atmost 14 charcters long')
        !this.passwordCorrect && errors.push('Password incorrect')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        if(!this.$v.$anyError) {
          const mail = this.mail;
          const password = this.password;
          this.$emit('signin',{mail,password});
        }
      },
      clear () {
        this.$v.$reset()
        this.mail = ''
        this.password = ''
        this.showPW = false
      },
      toggle (){
        this.$emit('toggle')
      }
    },
  }
</script>