const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const callSendAPI = require("../utils/callSendAPI");

const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = { text: "Oke =))" };
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleGetStarted,
};
