const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();
app.use(express.json());

const config = {
  channelAccessToken:"nLa1xPmavwxaxHUMMCNuDdeU2BHdT06rnAG5qmgLEfV+si2usanQFFHSscdy8a089J9e4aSPcdDoO47RrWlD7P9VQTT0woeHIY3z5SiV07ILsLruVNiENQJ5/FhwetHA4sXD0kdHoRDPCp/F2ed6RwdB04t89/1O/w1cDnyilFU=",
  channelSecret:"f742c82dce71e7673676c92686cbfb69",
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    const results = await Promise.all(events.map(handleEvent));
    res.json(results);
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

  if (event.message.text === '缶') {
    const replyText = 'はい、これ';
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText,
    });
  }

  return Promise.resolve(null);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
