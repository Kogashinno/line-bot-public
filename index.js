const express = require('express');
const { Client } = require('@line/bot-sdk');
const bodyParser = require('body-parser');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
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
    const replyText = 'はい、これ';
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText
    });
  }

  return Promise.resolve(null);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
