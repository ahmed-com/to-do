<template>
  <div >
    <v-navigation-drawer app>
      <p>the navigation drawer</p>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" ></v-app-bar-nav-icon>
      <v-tool-bar-title>the app bar</v-tool-bar-title>
    </v-app-bar>

    
    <v-content class=" ml-4 my-4">
      <p>the content</p>
      
      <v-container fluid>
        <p>the container</p>
          <TodoList :todoList="todoList"/>
          <TodoForm @createTodo="createTodo"/>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <p>the footer</p>
    </v-footer>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'

export default {
  computed : {
    todoList(){
      return this.$store.state.todos
    }
  },
  components : {
    TodoList,
    TodoForm
  },
  methods : {
    createTodo(todoTxt){
      const todo = JSON.stringify({text : todoTxt, icon : 'mdi-clock'});
      this.$store.dispatch('createTodo',todo);
    }
  }
}
</script>
