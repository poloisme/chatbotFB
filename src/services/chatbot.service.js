const request = require("request");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
    sender_action: "typing_on",
  };

  //send typing on action
  await typingOn(sender_psid);
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

const typingOn = (sender_psid) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
    sender_action: "mark_seen",
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("typing on!");
      } else {
        console.error("Unable to typing on:" + err);
      }
    }
  );
};

const sendMaskSeem = (sender_psid) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "mark_seen",
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("typing on!");
      } else {
        console.error("Unable to typing on:" + err);
      }
    }
  );
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
                title: "CHAT VỚI HỖ TRỢ VIÊN",
                payload: "CHAT_WITH_SUPPORTER",
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

const handleSendListProduct = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = getListProductTemplate();
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

const getListProductTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title:
              'Giày Sneaker Nam Nữ Adidas Yeezy 350 v2 Mono "Clay" - Hàng Chính Hãng',
            subtitle: "4.990.000₫",
            image_url:
              "https://bizweb.dktcdn.net/thumb/1024x1024/100/413/756/products/196396788-4183697508335657-2918987510988184969-n.jpg?v=1624427705253",
            buttons: [
              {
                type: "web_url",
                url: "https://bountysneakers.com/gw2870",
                title: "XEM CHI TIẾT",
              },
              {
                type: "postback",
                title: "ĐẶT HÀNG NGAY",
                payload: "ORDER",
              },
            ],
          },
          {
            title:
              'Giày Sneaker Nam Adidas Ultraboost 21 Fy0373 "Solar Yellow" - Hàng Chính Hãng',
            subtitle: "2.850.000₫",
            image_url:
              "https://bizweb.dktcdn.net/thumb/1024x1024/100/413/756/products/387a7bc8-142a-4b9d-8fc3-9ee7700d528b.jpg?v=1618559685917",
            buttons: [
              {
                type: "web_url",
                url: "https://bountysneakers.com/fy0373",
                title: "XEM CHI TIẾT",
              },
              {
                type: "postback",
                title: "ĐẶT HÀNG NGAY",
                payload: "ORDER",
              },
            ],
          },
          {
            title:
              'Giày Sneaker Nam Adidas Day Jogger Fy3015 "Triple Black" - Hàng Chính Hãng',
            subtitle: "1.450.000₫",
            image_url:
              "https://bizweb.dktcdn.net/thumb/1024x1024/100/413/756/products/giay-ultraboost-21-xam-fy0375-01-standard-076b8e00-e5a7-4ef5-9673-3d8b7105f43a.jpg?v=1624429002367",
            buttons: [
              {
                type: "web_url",
                url: "https://bountysneakers.com/fy3015",
                title: "XEM CHI TIẾT",
              },
              {
                type: "postback",
                title: "ĐẶT HÀNG NGAY",
                payload: "ORDER",
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
  handleSendListProduct,
};
