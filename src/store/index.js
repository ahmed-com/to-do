import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth : false,
    todos : [],
    user : {}
  },
  getters : {
    // here you can request the todos in specific orders.
  },
  mutations: {
    authUser(state,{user,token}){
      state.auth = true;
      state.user = user;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token',token);
    },
    initTodos(state,todos){
      state.todos = todos;
    },
    addTodo(state,todo){
      state.todos.push(todo);
    },
    clearState(state){
      state.auth = false;
      state.todos = [];
      state.user = {};
      axios.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem('token');
    },
    updateUser(state,data){
      state.user.data = data;
    },
    updateTodo(state,{index,data}){
      state.todos[index].data = data;      
    }
  },
  actions: {

    signUp({commit,dispatch},authData){
      return new Promise((resolve,reject)=>{
        axios.post('/user/signup',{
          mail : authData.mail,
          password : authData.password,
          userName : authData.userName,
          data : authData.data || JSON.stringify({})
        })
        .then(res =>{
          commit('authUser',res.data);
          dispatch('createTodoList',{resolve,reject})
        })
        .catch(err=>{
          reject(err.response.status);
        })
      });
    },

    signIn({commit,dispatch},authData){
      return new Promise((resolve,reject)=>{
        axios.post('/user/signin',{
          mail : authData.mail,
          password : authData.password
        })
        .then(res =>{        
          commit('authUser',res.data);
          dispatch('fetchTodoList',{resolve,reject});
        })
        .catch(err=>{
          reject(err.response.status);
        })
      })
    },

    updateUser({commit},{data,resolve,reject}){
      axios.put('/user/update',{data})
      .then(()=>{
        commit('updateUser',data);
        resolve();
      })
      .catch(err=>{
        reject(err.response.status);
      })
    },

    signOut({commit}){
      commit('clearState');
    },

    createTodoList({state,dispatch},{resolve,reject}){
      axios.post('/room',{data : JSON.stringify({"name":"to-do list"})})
      .then(res =>{        
        const listId = res.data.room.id;
        const updatedUserData = {...state.user.data,listId};        
        dispatch('updateUser',{data : JSON.stringify(updatedUserData),resolve,reject});
      })
      .catch(err=>{
        reject(err.response);
      })
    },

    fetchTodoList({state,commit},{resolve,reject}){
      axios.post('/records',{
        room : state.user.data.listId
      })
      .then(res=>{
        commit('initTodos',res.data.records);
        resolve()
      })
      .catch(err=>{
        reject(err.response.status);
      });
    },

    createTodo({commit,state},data){
      axios.post('/record',{
        room : state.user.data.listId,
        data
      })
      .then(res=>{
        commit('addTodo',res.data.record);
      })
    },

    updateTodo({commit,state},{data,index,id}){
      axios.put('/record',{
        room : state.user.data.listId,
        recordId : id,
        data
      })
      .then(()=>{
        commit('updateTodo',{index,data});
      })
    }

  },
  modules: {
  }
})
