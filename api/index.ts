const express = require('express')
const dotenv = require('dotenv')
const { GoogleAuth } = require('google-auth-library')
const { google } = require('googleapis')
dotenv.config()

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const getGCPCredentials = () => {
  // for Vercel, use environment variables
  return process.env.GCP_PRIVATE_KEY
    ? {
        credentials: {
          client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY,
        },
        projectId: process.env.GCP_PROJECT_ID,
      }
    : // for local development, use gcloud CLI
      {}
}

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

const service = google.sheets(getGCPCredentials())

/**
 * Gets cell values from a Spreadsheet.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @param {string} range The sheet range.
 * @return {obj} spreadsheet information
 */

app.get('/', (req, res) => {
  return res.json({ hola: 'mundo' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT)

module.exports = app
