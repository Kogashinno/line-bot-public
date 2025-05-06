const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();
console.log('SECRET:', process.env.LINE_CHANNEL_SECRET);
const app = express();
app.use(express.json());

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    const results = await Promise.all(events.map(handleEvent));
    res.sendStatus(200);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).end();
  }
});

async function handleEvent(event) {
  console.log('受け取ったイベント:', JSON.stringify(event));

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  31: if (event.message.text === '缶') {
32:   const replyText = 'はい、これ';
33:   try {
34:     await client.replyMessage(event.replyToken, {
35:       type: 'text',
36:       text: replyText,
37:     });
38:   } catch (err) {
39:     console.error('リプライエラー:', err);
40:   }
41: }

  return Promise.resolve(null);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
