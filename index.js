const express = require('express');
const { middleware, Client } = require('@line/bot-sdk');
require('dotenv').config();

console.log('SECRET:', process.env.LINE_CHANNEL_SECRET);

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

// middleware は json() より先に！
app.post('/webhook', middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    await Promise.all(events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        if (event.message.text === '缶') {
          await client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'はい、これ',
          });
        }
      }
    }));
    res.sendStatus(200);
  } catch (err) {
    console.error('全体エラー:', err);
    res.sendStatus(500);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
