const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

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
