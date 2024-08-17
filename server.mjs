import express from 'express';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let urlDatabase = {};


app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(6);
  urlDatabase[shortId] = originalUrl;
  res.json({ shortId });
});


app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlDatabase[shortId];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
