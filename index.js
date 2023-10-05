import express from "express";
import  OpenAIApi  from "openai";
import bodyParser from "body-parser";
import ejs from 'ejs';
import env from 'dotenv';
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
env.config();
const openai = new OpenAIApi({
    apiKey: `${process.env.API_URL}`,
  });
  

app.get('/', (req, res) => {
    res.render("input");
});
async function getPrompt(prompt) {
    try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: prompt,
          temperature: 0.7,
<<<<<<< HEAD
          max_tokens:500,
=======
          max_tokens:400,
>>>>>>> 21c068b89f9d2dfbdbed6f3e29703cbe385e1da0
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

app.post('/api',async(req,res)=>{
    console.log(req.body)
    const place=req.body.Place;
    const days=req.body.Days;
    const result=await getPrompt([ { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: `${days} days trip planning to ${place}?` }]);
    console.log(result)
    res.render("api",{Plan:result, placeName:req.body.Place})
})

app.get('/app',async(req,res)=>{
   
    res.render("api")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
