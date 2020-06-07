<template>
  <form>
    <v-text-field
      v-model="userName"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      @blur="$v.userName.$touch()"
    ></v-text-field>
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
    <v-text-field
      v-model="cPassword"
      :append-icon="showCPW ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showCPW ? 'text' : 'password'"
      label="Confirm Password"
      :error-messages="confirmPasswordErrors"
      @click:append="showCPW = !showCPW"
      @blur="$v.cPassword.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
<script>
  import { required, maxLength, minLength, email, sameAs, alphaNum } from 'vuelidate/lib/validators'
  const isUnique = (value,vm) =>{
    return vm.isUniqueEmail(value);
  }

  export default {
    
    props: {
      isUniqueEmail : {
        type : Function,
        required : false,
        default : function(){
          return new Promise(resolve=>{
            resolve(true)
          })
        }
      }
    },

    validations: {
      userName: { required, alphaNum,maxLength: maxLength(10) },
      mail: { 
        required, 
        email,
        isUnique
      },
      checkbox: {
        checked (val) {
          return val
        },
      },
      password : {
        required,
        minLen : minLength(5),
        maxLen : maxLength(14)
      },
      cPassword : {
        required,
        sameAs : sameAs('password')
      }
    },

    data: () => ({
      userName: '',
      mail: '',
      checkbox: false,
      password : '',
      cPassword : '',
      showPW : false,
      showCPW : false
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.userName.$dirty) return errors
        !this.$v.userName.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.userName.required && errors.push('Name is required.')
        !this.$v.userName.alphaNum && errors.push('Name should only contain letters and numbers.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.mail.$dirty) return errors
        !this.$v.mail.email && errors.push('Must be valid e-mail')
        !this.$v.mail.required && errors.push('E-mail is required')
        !this.$v.mail.isUnique && errors.push('this E-mail is already taken')
        return errors
      },
      passwordErrors (){
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        !this.$v.password.minLen && errors.push('Password should be atleast 5 charcters long')
        !this.$v.password.maxLen && errors.push('Password should be atmost 14 charcters long')
        return errors
      },
      confirmPasswordErrors(){
        const errors = []
        if(!this.$v.cPassword.$dirty) return errors
        !this.$v.cPassword.required && errors.push('Please confirm your password')
        !this.$v.cPassword.sameAs && errors.push('Passwords don\'t match')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.userName = ''
        this.mail = ''
        this.password = ''
        this.cPassword = ''
        this.showPW = false
        this.showCPW = false
        this.checkbox = false
      },
    },
  }
</script>