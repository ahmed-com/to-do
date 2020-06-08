<template>
    <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list flat>
      <v-subheader>TO-DOs</v-subheader>
      
        <v-list-item
          v-for="todo in todoList"
          :key="todo.id"
        >
          <v-list-item-icon>
            <v-icon v-text="todo.data.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="todo.data.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
    </v-list>
  </v-card>
</template>
<script>
export default {
    props : {
        todoList : Array
    }
}
</script>
<style scoped>

</style>