import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { config } from 'dotenv';
import { extract } from '@extractus/article-extractor';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
config();

const GOOGLE_GEN_AI_API_KEY = process.env.GOOGLE_GEN_API_API_KEY;

const meta = {
  service: 'article-parser',
  lang: 'javascript',
  server: 'express',
  platform: 'node',
};

app.get('/', async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.json(meta);
  }

  extract(url)
    .then((extractionResult) => {
      const apiUrl = "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyCZcyspOWVjwtSizMayXpz5G6mueRM33Pw";
      const aiRequestData = {
        prompt: {
          text: `Summarize this article verbosely in-detail in 500 words or as much up to that as possible.\n\n${extractionResult.content}`,
          }
      };
      axios.post(apiUrl, aiRequestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((aiResult) => {
          return res.json(aiResult.data);
        })
        .catch((err) => {
          return res.json({
            error: 1,
            message: err.message,
            data: null,
            meta,
          });
        });
    })
    .catch((err) => {
      return res.json({
        error: 1,
        message: err.message,
        data: null,
        meta,
      });
    });

});

app.listen(3100, '0.0.0.0', () => {
  console.log('Server is running at http://0.0.0.0:3100')
});
