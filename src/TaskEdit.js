import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from './store';

const TaskEdit = ()=> {
  const { id } = useParams();
  const { tasks } = useSelector(state => state);
  const [name, setName] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    const task = tasks.find( task => task.id === id);
    if(task){
      setName(task.name);
      setIsComplete(task.isComplete);
    }
  }, [tasks]);

  const update = async(ev)=> {
    ev.preventDefault();
    await dispatch(updateTask({ name, id, isComplete }));
    navigate('/');
  };

  return (
    <form onSubmit={ update }>
      <input value={ name } onChange={ ev => setName(ev.target.value )}/>
      <input type='checkbox' checked={ isComplete } onChange={ev => setIsComplete(ev.target.checked)}/>
      <button>Update</button>
    </form>
  );
};

export default TaskEdit;
