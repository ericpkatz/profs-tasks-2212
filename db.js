const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/profs_tasks_db');
const { INTEGER, UUID, UUIDV4, STRING, BOOLEAN } = Sequelize;

const User = conn.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const Task = conn.define('task', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isComplete: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  priority: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 5
  }
});


module.exports = {
  conn,
  Task,
  User
};
