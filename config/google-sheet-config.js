import { GoogleAuth } from 'google-auth-library'
import { google } from 'googleapis'

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

export const service = google.sheets({ version: 'v4', auth })
