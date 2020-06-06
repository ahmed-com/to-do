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
        
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <p>the footer</p>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  
}
</script>
