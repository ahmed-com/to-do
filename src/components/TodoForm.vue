<template>
    <v-text-field
      v-model="todo"
      label="TO-DO"
      @keyup.enter="submit"
    ></v-text-field>
</template>
<script>
export default {
    data : ()=>({
        todo : ''
    }),
    methods : {
        submit(){
            if(this.todo !== '') {
                this.$emit('createTodo',this.todo);
                this.todo = '';
            }
        }
    }
}
</script>
<style scoped>

</style>