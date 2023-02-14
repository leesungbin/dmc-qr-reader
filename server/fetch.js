const axios = require("axios");
const ID = process.env.ID;
const API_KEY = process.env.API_KEY;
const RANGE = process.env.RANGE;

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${ID}/values/${RANGE}?key=${API_KEY}`;

async function getDataFromGoogle() {
  const res = await axios.get(BASE_URL);
  const columns = res.data.values[0];
  const json = res.data.values.slice(1).map((v) => {
    return columns.reduce((acc, cur, i) => {
      acc[cur] = v[i];
      return acc;
    }, {});
  });
  return json;
}

module.exports = { getDataFromGoogle };
