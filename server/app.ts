import { Server } from './server'
import { Sequelize } from 'sequelize-typescript'
import dotenv = require('dotenv')

dotenv.config({ path: './server/.env.server' })

// Create a instance of sequelize
const sequelize =  new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  modelPaths: [__dirname + '/models'],
})

// Create a instance of our server
const server = new Server({
  port: Number(process.env.PORT) || 3000,
})

// Synchronize the db
sequelize.sync().then(() => {
  // Run the server
  server.run()
})
