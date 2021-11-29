const request = require("request");
const dotenv = require("dotenv");
const { response } = require("express");
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

const getUserName = (sender_psid) => {
  return new Promise((resolve, reject) => {
    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          const data = JSON.parse(body);
          const username = `${data.last_name} ${data.first_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};

const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const username = await getUserName(sender_psid);
      const response = { text: `Hi. ${username}` };
      const responseTemplate = getStartedTemplate();

      //send text
      await callSendAPI(sender_psid, response);
      //send template
      await callSendAPI(sender_psid, responseTemplate);
      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

const getStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Welcome to shoes store",
            subtitle: "Lựa chọn của bạn",
            image_url:
              "https://foot.vn/wp-content/uploads/2020/09/giay-nike-air-force-1-x-dragon-para-noise-1.jpg",
            buttons: [
              {
                type: "postback",
                title: "SNEAKERS NỔI BẬT",
                payload: "SNEAKERS_HOT",
              },
              {
                type: "postback",
                title: "HƯỚNG DẪN SỬ DỤNG CHATBOT",
                payload: "GUIDE_TO_USE",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

module.exports = {
  handleGetStarted,
};
