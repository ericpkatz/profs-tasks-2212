import React, { useState } from 'react';
import { createTask } from './store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TaskCreate = ()=> {
  const [name, setName ] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [priority, setPriority] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const create = async(ev)=> {
    ev.preventDefault();
    await dispatch(createTask({ name, isComplete, priority }));
    navigate('/');
  };

  const priorities = [];
  for(let i = 1; i <= 20; i++){
    priorities.push(i);
  }
  console.log(priorities);
  return (
    <form onSubmit={ create }>
      <input value={ name } onChange={ ev => setName(ev.target.value)} placeholder='name of task'/>
      <label>
      IsComplete:
      <input type='checkbox' checked={ isComplete } onChange={ ev => setIsComplete(ev.target.checked)}/>
      </label>
      <select value={ priority } onChange={ ev => setPriority(ev.target.value) }>
        {
          priorities.map( p => {
            return (
              <option key={ p }>{ p }</option>
            );
          })
        }
      </select>
      <button>Create</button>
    </form>
  );
};

export default TaskCreate;
