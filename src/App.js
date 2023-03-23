import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from './store';
import { Routes, Route, Link} from 'react-router-dom';
import Tasks from './Tasks';
import TaskCreate from './TaskCreate';
import TaskEdit from './TaskEdit';

const App = ()=> {
  const { tasks } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchTasks());
  }, []);
  return (
    <div>
      <h1><Link to='/'>Tasks ({ tasks.length })</Link></h1>
      <Link to='/tasks/create'>Create A Task</Link>
      <Routes>
        <Route path='/' element={ <Tasks /> } />
        <Route path='/tasks/create' element={ <TaskCreate /> } />
        <Route path='/tasks/:id' element={ <TaskEdit /> } />
      </Routes>
    </div>
  );
};

export default App;
