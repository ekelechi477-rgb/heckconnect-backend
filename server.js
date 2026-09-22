import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req,res)=> res.send('HECKCONNECT live'));
app.post('/api/ai', async (req,res)=>{
  const msg = req.body.message || "hi";
  const key = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
  const r = await fetch(url, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:msg}]}]})});
  const j = await r.json();
  const reply = j.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
  res.json({reply});
});
app.listen(process.env.PORT || 3000);
