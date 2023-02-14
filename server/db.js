const { getDataFromGoogle } = require("./fetch");

class DB {
  static instance = null;
  constructor() {
    if (DB.instance) return DB.instance;
    DB.instance = this;
    this.setData();
  }

  setData() {
    this.data = getDataFromGoogle();
  }
}
module.exports = DB;
