import axios from 'axios'
import { MongoClient } from 'mongodb'

export default async function visit(url) {
  const client = new MongoClient(process.env.MONGO_CONNECTION_URL)
  await client.connect()
  const db = client.db(process.env.MONGO_DATABASE_NAME)
  const collection = db.collection('visits')

  const dateTime = new Date().toISOString()

  let latest = await collection.find({
    "dateTime" : {"$gte": new Date(new Date().setHours(0, 0, 0, 0)).toISOString() }
  }).limit(1).sort({ $natural: -1 }).toArray()

  axios.get(url)
    .then(res => {
      if (latest.length == 0) {
        collection.insertOne({
          dateTime: dateTime,
          status: res.status
        })
      }

      if (latest[0].status == 200) {
        return
      }

      collection.insertOne({
        dateTime: dateTime,
        status: res.status
      })
    })
    .catch(err => {
      if (latest.length == 0) {
        collection.insertOne({
          dateTime: dateTime,
          status: err?.response?.status ?? null
        })
      }

      if (latest[0].status != 200) {
        return
      }
      
      collection.insertOne({
        dateTime: dateTime,
        status: err?.response?.status ?? null
      })
    })
}
