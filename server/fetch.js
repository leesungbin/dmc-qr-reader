// const axios = require("axios");
const { google } = require("googleapis");
const { authorize } = require("./auth");

const ID = process.env.ID;
// const API_KEY = process.env.API_KEY;
const RANGE = process.env.RANGE;

// const MAIN_URL = `https://sheets.googleapis.com/v4/spreadsheets/${ID}/values/`;
// const DATA_URL = `${MAIN_URL}${RANGE}?key=${API_KEY}`;

async function getDataFromGoogle() {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: ID,
    range: RANGE,
  });
  // const res = await axios.get(DATA_URL);
  const columns = res.data.values[0];
  const json = res.data.values.slice(1).map((v) => {
    return columns.reduce((acc, cur, i) => {
      acc[cur] = v[i];
      return acc;
    }, {});
  });
  return json;
}

async function updateGoogleSheet(range, values) {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: ID,
    range,
    valueInputOption: "RAW",
    resource: { values },
  });
}

module.exports = { getDataFromGoogle, updateGoogleSheet };
