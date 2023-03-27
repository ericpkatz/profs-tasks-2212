import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

const tasks = (state = [], action)=> {
  if(action.type === 'SET_TASKS'){
    return action.tasks;
  }
  if(action.type === 'CREATE_TASK'){
    state = [...state, action.task];
    state.sort((a, b)=> {
      if(a.priority > b.priority){
        return 1;
      }
      return -1;
    });
  }
  if(action.type === 'UPDATE_TASK'){
    state = state.map(task => {
      if(task.id === action.task.id){
        return action.task;
      }
      return task;
    });
    state.sort((a, b)=> {
      if(a.priority > b.priority){
        return 1;
      }
      return -1;
    });
  }
  return state;
};

const users = (state = [], action)=> {
  if(action.type === 'SET_USERS'){
    return action.users;
  }
  return state;
};

const reducer = combineReducers({
  tasks,
  users
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export const fetchUsers = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data });
  };
};

export const fetchTasks = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/tasks');
    dispatch({ type: 'SET_TASKS', tasks: response.data });
  };
};

export const createTask = (task)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: 'CREATE_TASK', task: response.data });
  };
};

export const updateTask = (task)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch({ type: 'UPDATE_TASK', task: response.data });
  };
};

export default store;
