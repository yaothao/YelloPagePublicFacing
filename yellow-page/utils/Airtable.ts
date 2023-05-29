// const Airtable = require('airtable');
import Airtable from 'airtable';
const { env } = require('process');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: env.AIRTABLE_API_KEY,
});

const base = Airtable.base('appw8q4h7vrBErGRJ');
const table = base.table('tblqbLm0jCiPSO7Jl');

export { base, table };
