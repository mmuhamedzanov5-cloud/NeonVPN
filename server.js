const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Нужен ?url=');
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });
    res.setHeader('Content-Type', response.headers['content-type'] || 'text/html');
    response.data.pipe(res);
  } catch (err) {
    res.send('Ошибка: ' + err.message);
  }
});

app.listen(process.env.PORT || 3000);