require('dotenv').config();
const { Cashfree, CFEnvironment } = require('cashfree-pg');

const cashfree = new Cashfree(
  CFEnvironment[process.env.CASHFREE_ENV],
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

module.exports = { cashfree };
