const express = require('express');
const app = express();
const path = require('path');
const { conn, Task } = require('./db');

app.use('/dist', express.static('dist'));
app.use(express.json());
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/tasks', async(req, res, next)=> {
  try {
    res.send(await Task.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/tasks', async(req, res, next)=> {
  try {
    res.status(201).send(await Task.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    await Promise.all(
      ['quq', 'take out trash', 'get milk'].map( name => Task.create({ name }))
    );
  }
  catch(ex){
    console.log(ex);
  }
});