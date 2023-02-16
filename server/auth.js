const path = require("path");
const fs = require("fs");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIAL_PATH = path.join(process.cwd(), "credentials.json");
let credentials;

function initCredentials() {
  fs.writeFileSync(CREDENTIAL_PATH, process.env.CREDENTIAL);
  fs.writeFileSync(TOKEN_PATH, process.env.TOKEN);
  credentials = JSON.parse(fs.readFileSync(CREDENTIAL_PATH));
}

const SCOPE = ["https://www.googleapis.com/auth/spreadsheets"];

function saveCredentials(client) {
  const {
    installed: { client_id, client_secret },
  } = credentials;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id,
    client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  fs.writeFileSync(TOKEN_PATH, payload);
}

async function loadSavedToken() {
  try {
    const exists = fs.existsSync(TOKEN_PATH);
    if (!exists) return null;
    const content = fs.readFileSync(TOKEN_PATH);
    const tokenParsed = JSON.parse(content);
    return await google.auth.fromJSON(tokenParsed);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function authorize() {
  let client = await loadSavedToken();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPE,
    keyfilePath: CREDENTIAL_PATH,
  });
  if (client.credentials) {
    saveCredentials(client);
  }
  return client;
}
// authorize();

module.exports = { authorize, initCredentials };
