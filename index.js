const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  console.log('受け取ったイベント:', JSON.stringify(event));

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  if (event.message.text === '缶') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'はい、これ',
    });
  }

  return Promise.resolve(null);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
