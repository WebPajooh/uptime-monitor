import cron from 'node-cron'
import visit from './visitor.js'
import dotenv from 'dotenv'

dotenv.config()

cron.schedule(`*/${process.env.FREQUENCY} * * * *`, () => {
  visit(process.env.TARGET)
})
