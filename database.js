const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    dueDate: {
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: "Incomplete"
    },
    priority: {
        type: Sequelize.STRING,
        defaultValue: "Low"
    }
})

const Notes = db.define("notes",{
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    todoId: {
        type: Sequelize.INTEGER,
        allowNull:false
        },
    value: {
        type: Sequelize.STRING(300),
        allowNull: false
    }
})

module.exports = {
    db, Todos , Notes
}