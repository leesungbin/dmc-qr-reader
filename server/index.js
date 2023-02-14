const express = require("express");
const cors = require("cors");
const DB = require("./db");
const app = express();
const port = process.env.PORT;

const db = new DB();

function response(res, user) {
  if (user) {
    res.json(user);
  } else {
    res.json({ msg: "not found" });
  }
}
function findStrategy(userKey, req, reqKey) {
  return (user) => user[userKey] === req.body[reqKey];
}
app.use(cors());
app.use(express.json());
app.post("/find", async (req, res) => {
  const data = await db.data;
  const user = data.find(findStrategy("TicketID", req, "TicketID"));
  response(res, user);
});

app.post("/name", async (req, res) => {
  const data = await db.data;
  const user = data.find(findStrategy("이름", req, "name"));
  response(res, user);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
