import React, { useState } from 'react';
import { createTask } from './store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TaskCreate = ()=> {
  const [name, setName ] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const create = async(ev)=> {
    ev.preventDefault();
    await dispatch(createTask({ name, isComplete }));
    navigate('/');
  };
  return (
    <form onSubmit={ create }>
      <input value={ name } onChange={ ev => setName(ev.target.value)} placeholder='name of task'/>
      <input type='checkbox' checked={ isComplete } onChange={ ev => setIsComplete(ev.target.checked)}/>
      <button>Create</button>
    </form>
  );
};

export default TaskCreate;
