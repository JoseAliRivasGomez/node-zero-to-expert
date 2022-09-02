import {Sequelize} from 'sequelize';

const db = new Sequelize('node', 'root', undefined, {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;