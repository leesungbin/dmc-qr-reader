const { getDataFromGoogle, updateGoogleSheet } = require("./fetch");

class DB {
  static instance = null;
  constructor() {
    if (DB.instance) return DB.instance;
    DB.instance = this;
  }

  async setData() {
    this.data = await getDataFromGoogle();
    console.log("db renewed");
  }
  checkIn(col) {
    updateGoogleSheet(`T${col}`, [[1]]);
  }
}
module.exports = DB;
