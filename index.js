import express from 'express'
import {
  getValues,
  appendValues,
  getTotalPerDayByMonth,
} from './services/serviceData.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  const month = req.query.month
  const upToDay = req.query.upToDay
  if (!month) return res.json({ error: 'Invalid month' })
  return res.json(
    await getValues({
      spreadsheetId: '1Yk24_5hAKPtgJSd3Srtfsia5x2uLF-BKCADB9n74ODk',
      range: `${month}!A12:G100`,
      upToDay,
      month,
    })
  )
})

app.post('/', (req, res) => {
  const value = req.body

  appendValues(
    '1Yk24_5hAKPtgJSd3Srtfsia5x2uLF-BKCADB9n74ODk',
    `junio!A12:G100`,
    value
  )
  console.log(value)
  return res.json(value)
})

app.get('/getAccPerDay', async (req, res) => {
  const month = req.query.month
  if (!month) return res.json({ error: 'Invalid month' })
  const result = await getTotalPerDayByMonth({ month })
  return res.json(result)
})

const PORT = process.env.PORT || 3000

app.listen(PORT)
