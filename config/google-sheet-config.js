import { GoogleAuth } from 'google-auth-library'
import { google } from 'googleapis'

const credentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.PROVIDER_509,
  client_x509_cert_url: process.env.CERT_URL,
}

const auth = new GoogleAuth({
  credentials,
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

export const service = google.sheets({ version: 'v4', auth })
