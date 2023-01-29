import cron from 'node-cron'
import visit from './visitor.js'
import dotenv from 'dotenv'

dotenv.config()

cron.schedule('* * * * *', () => {
  visit(process.env.TARGET)
})
