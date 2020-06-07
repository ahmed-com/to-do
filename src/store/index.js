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
      axios.post('/user/signup',{
        mail : authData.mail,
        password : authData.password,
        userName : authData.userName,
        data : authData.data
      })
      .then(res =>{
        if(res.status === 422) throw new Error('mail already exists');
        commit('authUser',res);
        dispatch('createTodoList')
      });
    },
    signIn({commit,dispatch},authData){
      axios.post('/user/signin',{
        mail : authData.mail,
        password : authData.password
      })
      .then(res =>{
        if(res.status === 404){
          const err = new Error('mail incorrect');
          err.status = 404;
          throw err
        }
        if(res.status === 401){
          const err = new Error('password incorrect');
          err.status = 401;
          throw err
        }
        commit('authUser',res);
        dispatch('fetchTodoList');
      })
    },
    updateUser({commit},data){
      axios.put('/user/update',{data})
      .then(()=>{
        commit('updateUser',data);
      });
    },
    signOut({commit}){
      commit('clearState');
    },
    createTodoList({state,commit}){
      axios.post('/room',{data : {}})
      .then(res =>{
        const listId = res.room.id;
        const updatedUserData = {...state.user.data,listId};
        commit('updateUser',updatedUserData);
      })
    },
    fetchTodoList({state,commit}){
      axios.post('/records',{
        room : state.user.data.listId
      })
      .then(res=>{
        commit('initTodos',res.records);
      })
    },
    createTodo({commit,state},data){
      axios.post('/record',{
        room : state.user.data.listId,
        data
      })
      .then(res=>{
        commit('addTodo',res.record);
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
